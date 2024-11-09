import { BigQuery, Table, TableMetadata } from "@google-cloud/bigquery";

export async function createDataSet(datasetName: string) {
  const bigQueryClient = new BigQuery();

  const [dataset] = await bigQueryClient.createDataset(datasetName);
  console.log(`Dataset ${dataset.id} created.`);
  return dataset;
}

export async function createTable(datasetName: string, tableName: string, tableSchema: any, tableLocation: string) {
  const options: TableMetadata = {
    schema: tableSchema,
    location: tableLocation,
  };

  const bigQueryClient = new BigQuery();

  const [table] = await bigQueryClient.dataset(datasetName).createTable(tableName, options);
  console.log(`Table ${table.id} created.`);
  return table;
}

export async function insertRows(datasetName: string, tableName: string, rows: any[]) {
  const bigQueryClient = new BigQuery();

  await bigQueryClient.dataset(datasetName).table(tableName).insert(rows);
  console.log(`Inserted ${rows.length} rows.`);
}
