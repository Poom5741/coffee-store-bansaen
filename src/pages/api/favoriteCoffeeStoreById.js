import {
  table,
  findRecordByFilter,
  getMinifiedRecords,
} from "../../../lib/airtable";

const favoriteCoffeeStoreById = async (req, res) => {
  const { id } = req.body;
  if (req.method === "PUT") {
    try {
      const records = await findRecordByFilter(id);

      if (id) {
        if (records.length !== 0) {
          const record = records[0];
          const calculateVoting = parseInt(record.voting) + parseInt(1);

          //update record
          const updateRecord = await table.update([
            {
              id: record.recordId,
              fields: {
                voting: calculateVoting,
              },
            },
          ]);
          if (updateRecord) {
            const menifiedRecords = getMinifiedRecords(updateRecord);
            res.json(menifiedRecords);
          }

          res.json(records);
        } else {
          res.json({ message: "coffee store id dose not exist" });
        }
        res.json({ massage: "this is work", id });
      } else {
        res.status(400);
        res.json({ message: "id is missing" });
      }
    } catch (err) {
      res.status(500);
      console.error("error up voting coffee store", err);
    }
  }
};

export default favoriteCoffeeStoreById;
