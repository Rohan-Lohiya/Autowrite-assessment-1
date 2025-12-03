let DB = [];

function saveRecord(record) {
  const newRecord = {
    id: Date.now().toString(),
    ...record,
    createdAt: new Date(),
  };
  DB.push(newRecord);
  return newRecord.id;
}

function getAll() {
  return DB;
}

module.exports = { saveRecord, getAll };
