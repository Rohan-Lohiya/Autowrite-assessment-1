const pdfModule = require("pdf-parse");

let pdfFn = null;

if (typeof pdfModule === "function") {

  pdfFn = pdfModule;
} else if (typeof pdfModule.PDFParse === "function") {
  
  pdfFn = pdfModule.PDFParse;
} else {
  console.error("pdf-parse export shape:", Object.keys(pdfModule));
  throw new Error("Could not find a callable pdf-parse function");
}

exports.extractPDF = async function extractPDF(buffer) {
  const data = await pdfFn(buffer);
  // data.text contains extracted text
  return data.text || "";
};
