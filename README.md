# Spreadsheet to PDF Frontend

A React application for reading spreadsheet rows, previewing them in a table and filling PDF templates in the browser. It also includes a form-input route for PDF generation.

## Implementation

- Spreadsheet parsing with SheetJS (`xlsx`).
- PDF loading, text placement and font handling with `pdf-lib` and fontkit.
- ZIP packaging of generated files with JSZip and file-saver.
- Right-to-left layout and Arabic number-to-words support.
- Separate spreadsheet and form-input pages.

## Stack

React 18, JavaScript, React Router 6, Bootstrap 5, SheetJS, pdf-lib and JSZip.

## Run locally

Requires Node.js and npm. From the repository directory:

```sh
npm install
npm start
```

Open `http://localhost:3000`. The app routes to `/home`; `/home2` contains the form-input flow.

```sh
npm run build
npm test
```

These are the configured scripts, not a claim that a fresh build or test run has passed.

## Source guide

- `src/pages/ExcelToPdf.jsx`: spreadsheet processing and template filling.
- `src/pages/InputToPdf.jsx`: form-input flow.
- `src/components/TableComponents/`: preview table.
- `src/App.js`: routes and layout.

## Data and template safety

The current mappings and PDF layouts are specific to the bundled templates, not a universal spreadsheet converter. Use synthetic sample rows only. Review templates and outputs for personal or financial information before sharing, and never upload real customer records to a portfolio demo.

## Attribution

The source contains the `tafqit` Arabic number-to-words function by Mohsen Alyafei, with its existing MIT attribution. Keep that attribution when reusing the function.

This repository is an implementation example, not a production-ready financial document service.
