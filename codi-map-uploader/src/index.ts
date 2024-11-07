import { Storage, TransferManager } from "@google-cloud/storage";
import dotenv from "dotenv";
import path from "path";
import fs from "fs/promises";

dotenv.config();

const GCP_STORAGE_BUCKET_NAME = process.env.GCP_STORAGE_BUCKET_NAME;
console.log("[GCP CLOUD STORAGE] Bucket Name : ", GCP_STORAGE_BUCKET_NAME);

const storage = new Storage();
const transferManager = new TransferManager(storage.bucket(GCP_STORAGE_BUCKET_NAME as string));

export async function uploadFileToGCPStorage(dirName: string) {
  try {
    console.log("[GCP CLOUD STORAGE] uploading files...");
    const files = await fs.readdir(path.resolve(dirName));
    const filePaths = files.map((file) => path.join(dirName, file));

    await transferManager.uploadManyFiles(filePaths);
    console.log("[GCP CLOUD STORAGE] successfully uploaded files");
  } catch (e) {
    console.log("[GCP CLOUD STORAGE] Uploading Downloaded Image Failed! : ", e);
  }
}

export async function removeDownloadedFiles(dirName: string) {
  try {
    await fs.rm(dirName, { recursive: true, force: true });
  } catch {
    console.log("[GCP CLOUD STORAGE] Removing Downloaded Image Cache Failed!");
  }
}
