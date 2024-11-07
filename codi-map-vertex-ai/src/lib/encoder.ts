import fs from "fs";

export function base64Encoder(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) reject(err);

      const base64Image = data.toString("base64");
      resolve(base64Image);
    });
  });
}
