import { downloadFile, readCodiMap } from "./crawling";
import { removeDownloadedFiles, uploadFileToGCPStorage } from "./upload";

async function main(arg: string) {
  console.log("arg : ", arg);

  let id = 1;
  for (let page = 1; page < +arg; page++) {
    console.log("[CRAWLING] Page : ", page);
    const codiMap = await readCodiMap(page);

    for (const codi of codiMap) {
      const imageURL = codi.medias[0].path;

      const serializedTag = codi.tags.map((tag: { name: string }) => tag.name).join(",");

      try {
        await downloadFile(imageURL, "./downloads", `${id}-${serializedTag}.jpg`);
        await uploadFileToGCPStorage("./downloads");
        await removeDownloadedFiles("./downloads");
      } catch (e) {
        console.log("ERR : ", e);
      }
      id++;
    }
  }
}

main(process.argv[2]);
