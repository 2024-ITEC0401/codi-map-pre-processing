import { Storage } from "@google-cloud/storage";

export async function getBucketMetaData(bucketName: string) {
  const storage = new Storage();
  const [metadata] = await storage.bucket(bucketName).getMetadata();
  console.log(JSON.stringify(metadata, null, 2));
  return metadata;
}

export async function listBucketFiles(bucketName: string) {
  const storage = new Storage();
  const [files] = await storage.bucket(bucketName).getFiles();
  return files.map((file) => file.cloudStorageURI.href);
}

// listBucketFiles("codi-map-images").then(console.log);
