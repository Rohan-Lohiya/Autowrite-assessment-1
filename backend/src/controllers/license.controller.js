const { saveSubmission, getAllSubmissions } = require("../services/fileStorage.service");

function saveLicense(req, res) {
  try {
    const { firstName, lastName, licenseNo, expiryDate, address, dob } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !licenseNo) {
      return res.status(400).json({
        error: "Missing required fields: firstName, lastName, licenseNo",
      });
    }

    // Construct record
    const record = {
      id: Date.now().toString(),
      firstName,
      lastName,
      licenseNo,
      expiryDate: expiryDate || "",
      address: address || "",
      dob: dob || "",
      createdAt: new Date().toISOString(),
    };

    // Save to JSON file
    saveSubmission(record);

    return res.status(201).json({
      ok: true,
      id: record.id,
      saved: record,
    });
  } catch (err) {
    console.error("saveLicense error:", err);
    return res.status(500).json({
      error: "Internal server error while saving license",
    });
  }
}

function getAllLicenses(req, res) {
  try {
    const data = getAllSubmissions();
    return res.status(200).json({
      ok: true,
      data,
    });
  } catch (err) {
    console.error("getAllLicenses error:", err);
    return res.status(500).json({
      error: "Failed to read stored licenses",
    });
  }
}

module.exports = { saveLicense, getAllLicenses };
