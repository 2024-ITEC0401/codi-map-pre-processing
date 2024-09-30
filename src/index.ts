import fs from "fs";
import path from "path";
import axios from "axios";
import { v4 as uuid } from "uuid";

import { mkdir } from "fs/promises";

async function readCodiMap(page: number) {
  const URL = `https://content.musinsa.com/api2/content/snap/v1/snaps/1268021161197507776/recommendations?page=${page}&size=10`;
  const response = await axios.get<CodiMapResponseBody>(URL);
  return response.data.data.list;
}

async function downloadFile(url: string, fileName: string) {
  const response = await axios({
    url,
    method: "GET",
    responseType: "stream", // 스트림 형태로 응답 받기
  });

  if (!fs.existsSync("downloads")) await mkdir("downloads");
  const destination = path.resolve("./downloads", fileName);
  const fileStream = fs.createWriteStream(destination, { flags: "wx" });

  response.data.pipe(fileStream); // 스트림 데이터를 파일로 저장

  await new Promise((resolve, reject) => {
    fileStream.on("finish", resolve);
    fileStream.on("error", reject);
  });
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
