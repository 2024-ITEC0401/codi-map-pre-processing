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
  try {
    await createDataSet(datasetName);
    await createTable(datasetName, tableName, tableSchema, "US");

    const files = await listBucketFiles(bucketName);
    files.forEach(async (file) => {
      const json = await analyzeImage(file);
      await insertRows(datasetName, tableName, [{ uri: file, json: JSON.stringify(json) }]);
    });
  } catch (e) {
    console.log(e);
  }
}

main();
