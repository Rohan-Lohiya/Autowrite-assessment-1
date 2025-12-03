const fs = require("fs");
const { extractPDF } = require("../services/pdf.service");
const { parseLicenseText } = require("../services/textParser.service");
const { createWorker } = require("tesseract.js");

exports.uploadLicense = async (req, res, next) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "File is required" });
    }

    const mime = file.mimetype;
    const filePath = file.path; 
    let rawText = "";

    // TXT → read text from file
    if (mime === "text/plain") {
      rawText = fs.readFileSync(filePath, "utf-8");
    }

    // PDF → read file as buffer and pass to pdf.service
    else if (mime === "application/pdf") {
      const buffer = fs.readFileSync(filePath);
      rawText = await extractPDF(buffer);
    }

    // IMAGE → read file as buffer and pass to Tesseract
    else if (mime.startsWith("image/")) {
      const buffer = fs.readFileSync(filePath);

      const worker = await createWorker("eng");
      const result = await worker.recognize(buffer);
      rawText = result.data.text || "";
      await worker.terminate();
    } else {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    const parsed = parseLicenseText(rawText);

    return res.json({
      ok: true,
      parsedFields: parsed,
      storedFileName: file.filename, 
      storedFilePath: filePath, 
    });
  } catch (err) {
    console.error("uploadLicense error:", err);
    next(err);
  }
};
