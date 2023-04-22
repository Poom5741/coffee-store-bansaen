var Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.AIRTABLE_PUBLIC_KEY,
});
var base = Airtable.base(process.env.AIRTABLE_BASE_KEY);
const table = base("coffee-stores");

const getMinifiedRecord = (record) => {
  return {
    recordId: record.id,
    ...record.fields,
  };
};

const getMinifiedRecords = (records) => {
  return records.map((record) => getMinifiedRecord(record));
};

const findRecordByFilter = async (id) => {
  const findCoffeeStoreRecords = await table
    .select({ filterByFormula: `id="${id}"` })
    .firstPage();

  return getMinifiedRecords(findCoffeeStoreRecords);
};
export { table, getMinifiedRecords, findRecordByFilter };
