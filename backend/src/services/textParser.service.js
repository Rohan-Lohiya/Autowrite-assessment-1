exports.parseLicenseText = function (text = "") {
  if (!text) return {};

  text = text.replace(/\r/g, "");

  const result = {};

  // --- NAME ---
  const nameMatch = text.match(/Name\s*:\s*([^\n]+)/i);
  if (nameMatch) {
    let fullName = nameMatch[1]
      .trim()
      .replace(/[^A-Za-z\s]/g, "")
      .replace(/\s+/g, " ");

    const parts = fullName.split(" ");
    if (parts.length === 1) {
      result.firstName = parts[0];
    } else {
      result.firstName = parts[0];
      result.lastName = parts.slice(1).join(" ");
    }
  }

  // --- LICENSE NO + EXPIRY ---
  const licExpMatch = text.match(/License\s+No\.?\s*:\s*([A-Z0-9 ]+?)\s+Date\s+of\s+Expiry\s*:\s*([0-9\/\-]+)/i);

  if (licExpMatch) {
    result.licenseNo = licExpMatch[1].trim();
    result.expiryDate = licExpMatch[2].trim();
  } else {
    const licenseMatch = text.match(/License\s+No\.?\s*:\s*([A-Z0-9 ]+)/i);
    if (licenseMatch) {
      result.licenseNo = licenseMatch[1].trim();
    }

    const expMatch = text.match(/Date\s+of\s+Expiry\s*:\s*([0-9\/\-]+)/i);
    if (expMatch) {
      result.expiryDate = expMatch[1].trim();
    }
  }

  // --- FALLBACK: DL No ---
  if (!result.licenseNo) {
    const dlMatch = text.match(/DL\s*No\.?\s*[:\-]?\s*([A-Z0-9\/\- ]+)/i);
    if (dlMatch) {
      result.licenseNo = dlMatch[1].trim();
    }
  }

  // --- DOI (Date of Issue) ---
  // Matches: "Date of Issue : 31-10-2022", "DOI : 31/10/2022", "Issued On : 31-10-2022"
  const doiMatch = text.match(/(Date\s+of\s+Issue|DOI|Issued\s+On)\s*[:\-]?\s*([0-9]{2}[\/\-][0-9]{2}[\/\-][0-9]{4})/i);
  if (doiMatch) {
    result.issueDate = doiMatch[2].trim();
  }

  // --- VALID TILL ---
  // Matches: "Valid Till : ...", "Valid Upto :", "Valid Up to :", "Valid Until :"
  const validMatch = text.match(
    /(VALID\s+TILL|Valid\s+Upto|Valid\s+Up\s*to|Valid\s+Until)\s*[:\-]?\s*([0-9]{2}[\/\-][0-9]{2}[\/\-][0-9]{4})/i
  );
  if (validMatch) {
    result.validTill = validMatch[2].trim();
  }

  // If still no validTill, fall back to expiryDate
  if (!result.validTill && result.expiryDate) {
    result.validTill = result.expiryDate;
  }

  // --- DOB ---
  const dobMatch = text.match(/DOB[^0-9]*([0-9]{2}[-\/][0-9]{2}[-\/][0-9]{4})/i);
  if (dobMatch) {
    result.dob = dobMatch[1].trim();
  }

  // --- ADDRESS ---
  const addrMatch = text.match(/Present\s+Address\s*:\s*([^\n]+)(?:\n([^\n]+))?/i);
  if (addrMatch) {
    const line1 = addrMatch[1].trim();
    const line2 = (addrMatch[2] || "").trim();
    result.address = line2 ? `${line1}, ${line2}` : line1;
  }

  return result;
};
