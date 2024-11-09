import { createDataSet, createTable, insertRows } from "./integration/bigquery";
import { analyzeImage } from "./analysis";
import { listBucketFiles } from "./integration/storage";

const bucketName = "codi-map-images";

const datasetName = "codi_map";
const tableName = "codi_map_analysis_json_result";

const tableSchema = [
  { name: "uri", type: "STRING", mode: "NULLABLE" },
  { name: "json", type: "STRING", mode: "NULLABLE" },
];

async function main() {
  const files = await listBucketFiles(bucketName);

  for (const [index, file] of files.entries()) {
    const decodedFile = decodeURI(file);

    console.log(`[VertexAI] Analyzing file : ${decodedFile}`);
    const json = await analyzeImage(decodedFile);
    console.log(`[VertexAI] Analyzing file Done! ${decodedFile}`);

    console.log(`[BigQuery] Inserting data to ${tableName} : ${decodedFile}`);
    await insertRows(datasetName, tableName, [{ uri: decodedFile, json: JSON.stringify(json) }]);
  }
}

main();
