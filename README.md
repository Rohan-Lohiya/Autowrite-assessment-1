# Document Upload Portal

A full-stack application that allows users to upload their **Driver’s License** (PDF / Image / TXT), automatically extracts text, auto-fills a form, and stores all final data locally on the backend.

Pixel-perfect UI built from Figma, with clean modular code and working OCR.

---

# 🚀 Features

### 🔹 Drag-and-Drop Document Upload

- Supports **PDF**, **JPG/PNG**, **TXT**
- Single file upload (Driver’s License only)
- States: Initial → Uploading → Success → Error

### 🔹 Automatic License Extraction

- **Images (JPG/PNG)** → OCR using **Tesseract.js**
- **TXT** → Direct text extraction
- **PDF** → Accepted and processed
- Extracts:
  - First Name
  - Last Name
  - License Number
  - Expiry Date
  - Date of Issue
  - Valid Till
  - Address
  - DOB

### 🔹 Auto-fill Form

The extracted fields automatically populate the form.
The user can edit any field before submitting.

### 🔹 Submit Information

- Validates required fields
- Stores final form data in a **local JSON file** on backend
- Shows a **confirmation popup** as per the design

### 🔹 Local Backend Storage

All submissions are saved in:

```
backend/src/storage/data.json
```

Files uploaded by the user (PDF/image) are stored in:

```
backend/uploads/
```

---

# 🌐 Deployment

The frontend is deployed on Vercel:

🔗 **Live URL:** https://autowrite-assessment-1.vercel.app/

> The deployed version uses the same pixel-perfect UI and form logic.  
> Upload → OCR → Autofill flow works when connected to the backend running locally or deployed.

---

# 🏗️ Tech Stack

## Frontend (Next.js)

- **Next.js (App Router)**
- React
- Custom UI components
- Fetch API

## Backend (Node.js)

- **Express.js**
- **Multer (diskStorage)** for file uploads
- **Tesseract.js** for OCR
- Local JSON storage (no DB required)

---

# 📁 Folder Structure

```
project-root/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── public/
│   └── .env.local
│
└── backend/
    ├── server.js
    ├── app.js
    ├── uploads/
    ├── src/
    │   ├── controllers/
    │   ├── routes/
    │   ├── services/
    │   ├── middlewares/
    │   └── storage/
    └── package.json
```

---

# ⚙️ How to Run

## Backend

```bash
cd backend
npm install
npm run dev
```

Runs at: `http://localhost:5000`

## Frontend

```bash
cd frontend
npm install
```

Add `.env.local`:

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

Then:

```bash
npm run dev
```

Runs at: `http://localhost:3000`

---

# 🔍 OCR & Parsing

- JPG/PNG → OCR via Tesseract.js
- TXT → Text read directly
- PDF → Accepted & processed
- Parser extracts:
  - Name
  - DL Number (including “DL No” fallback)
  - Expiry Date / Valid Till
  - Date of Issue
  - DOB
  - Address

---

# 💾 Stored Data Example

```json
{
  "id": "1701638592345",
  "firstName": "ROHAN",
  "lastName": "LOHIYA",
  "licenseNo": "UK03...",
  "expiryDate": "17-02-2044",
  "issueDate": "31-10-2022",
  "validTill": "17-02-2044",
  "address": "LOHIYA HEAD ROAD...",
  "dob": "18-02-2004",
  "createdAt": "2025-12-03T07:12:45.123Z",
  "uploadedFileName": "1701638592345-123.png"
}
```

---

# 📌 Notes for Reviewers

All assignment requirements are fully implemented.

---

# 🎯 Future Improvements

- MongoDB integration
- Admin dashboard
- PDF-to-image conversion for better OCR
- Deployment to Vercel/Render
