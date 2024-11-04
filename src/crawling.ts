import fs from "fs";
import path from "path";
import axios from "axios";

import { mkdir } from "fs/promises";

export async function readCodiMap(page: number) {
  const URL = `https://content.musinsa.com/api2/content/snap/v1/snaps/1268021161197507776/recommendations?page=${page}&size=10`;
  const response = await axios.get<CodiMapResponseBody>(URL);
  return response.data.data.list;
}

export async function downloadFile(url: string, destinationDirName: string, fileName: string) {
  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });

  if (!fs.existsSync(destinationDirName)) await mkdir(destinationDirName);
  const destination = path.resolve(`./${destinationDirName}`, fileName);
  const fileStream = fs.createWriteStream(destination, { flags: "wx" });

  response.data.pipe(fileStream);

  await new Promise((resolve, reject) => {
    fileStream.on("finish", resolve);
    fileStream.on("error", reject);
  });
}
