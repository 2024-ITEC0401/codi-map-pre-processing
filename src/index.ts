import fs from "fs";
import path from "path";
import axios from "axios";
import { v4 as uuid } from "uuid";

import { mkdir } from "fs/promises";
import { Readable } from "stream";
import { finished } from "stream/promises";

async function readCodiMap(page: number) {
  const URL = `https://content.musinsa.com/api2/content/snap/v1/snaps/1268021161197507776/recommendations?page=${page}&size=10`;
  const response = await axios.get<CodiMapResponseBody>(URL);
  return response.data.data.list;
}

async function downloadFile(url: string, fileName: string) {
  const response = await fetch(url);
  if (!fs.existsSync("downloads")) await mkdir("downloads");
  const destination = path.resolve("./downloads", fileName);
  const fileStream = fs.createWriteStream(destination, { flags: "wx" });
  await finished(Readable.fromWeb(response.body as any).pipe(fileStream));
}

async function main() {
  for (let page = 1; page < 1000; page++) {
    const codiMap = await readCodiMap(page);

    for (const codi of codiMap) {
      const imageURL = codi.medias[0].path;
      console.log(imageURL);
      downloadFile(imageURL, uuid() + ".jpg");
    }
  }
}

main();
