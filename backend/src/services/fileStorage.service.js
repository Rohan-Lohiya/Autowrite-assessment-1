const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "../storage/data.json");

// Ensure file exists
function ensureFile() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
  }
}

// Read all submissions
function readData() {
  ensureFile();
  const raw = fs.readFileSync(DATA_FILE, "utf8");
  return JSON.parse(raw || "[]");
}

// Append a new submission
function saveSubmission(record) {
  ensureFile();
  const data = readData();
  data.push(record);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2)); // pretty print
  return record;
}

// Get all saved submissions
function getAllSubmissions() {
  ensureFile();
  return readData();
}

module.exports = { saveSubmission, getAllSubmissions };
