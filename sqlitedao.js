const sqlite3 = require("sqlite3").verbose();
const util = require("util");
const dbPath = "./data/rcsa.db"; // Define the path for the SQLite database file

const db = new sqlite3.Database(dbPath);
const runQuery = util.promisify(db.run.bind(db));
const allQuery = util.promisify(db.all.bind(db));

let sheetsData = {};

// Function to read data from the PostgreSQL table and assign it to a dictionary
async function getSheetsData() {
  console.log("Initialized " + dbPath + " ", db);

  // Select all rows from the data_table
  const query =
    "SELECT   sheet_id, fmd.file_name, smd.sheet_name,  header_row " +
    " FROM file_meta_data as fmd " +
    " JOIN sheet_meta_data as smd ON fmd.FILE_ID = smd.file_id " +
    " order by sheet_id ";

  try {
    // Fetch data as JSON
    const data = await allQuery(query);
    return data;
  } catch (err) {
    console.error("Error executing query:", err.message);
  } finally {
  }
}

async function getFileIdFromName(fileName) {
  const query = `SELECT file_id FROM file_meta_data WHERE file_name = ? LIMIT 1`;
  let fieldId = await allQuery(query, [fileName]);
  return fieldId[0].file_id;
}

async function getSheetIdFromName(sheetName, fileId) {
  const query = `SELECT sheet_id FROM sheet_meta_data WHERE sheet_name = ? AND file_id = ? LIMIT 1`;
  let sheetId = await allQuery(query, [sheetName, fileId]);

  return sheetId[0].sheet_id;
}

// Function to read data from the PostgreSQL table and assign it to a dictionary
async function getAllRaus() {
  console.log("Initialized " + dbPath + " ", db);

  // Select all rows from the data_table
  const query =
    'SELECT rau_id  || " - " ||  rau_name as folderName,  file_name as files from file_meta_data, rau_info order by 1';

  try {
    // Fetch data as JSON
    const data = await allQuery(query);

    const jsonData = JSON.stringify(data);
    return jsonData;
  } catch (err) {
    console.error("Error executing query:", err.message);
  } finally {
  }
}

// Function to read data from the PostgreSQL table and assign it to a dictionary
async function getSelectedColumnsData() {
  console.log("Initialized " + dbPath + " ", db);

  // Select all rows from the data_table
  const query =
    "select   file_name , sheet_name ,field_name  " +
    " from fields_meta_data as fm  " +
    " inner join sheet_meta_data as smd on fm.sheet_id = smd.sheet_id " +
    " inner join file_meta_data as fmd on smd.file_id = fmd.file_id " +
    " order by fmd.file_id, smd.sheet_id,  fm.field_id";

  try {
    // Fetch data as JSON
    const data = await allQuery(query);

    const jsonData = JSON.stringify(data);
    return jsonData;
  } catch (err) {
    console.error("Error executing query:", err.message);
  } finally {
  }
}

// Function to read data from the PostgreSQL table and assign it to a dictionary
async function getColumnsData(sheetId) {
  const query =
    "SELECT * FROM fields_meta_data where sheet_id = " +
    sheetId +
    " ORDER BY field_id ";

  try {
    // Fetch data as JSON
    const data = await allQuery(query);
    return data;
  } catch (err) {
    console.error("Error executing query:", err.message);
  } finally {
  }
}

insertFieldValue = async (rauId, sheetId, rowId, fieldId, fieldValue) => {
  // INSERT query
  const query =
    "INSERT INTO rau_field_values (rau_id, sheet_id, row_id, field_id, field_value) VALUES (?, ?, ?, ?, ?)";

  try {
    // Fetch data as JSON
    await runQuery(query, [rauId, sheetId, rowId, fieldId, fieldValue]);
  } catch (err) {
    console.error("Error executing query:", err.message);
  } finally {
  }
};

const insertRau = async (rauId, rauName, createdBy) => {
  // INSERT query
  const query =
    "INSERT INTO rau_info (rau_id, rau_name, created_at , created_by) VALUES (?, ?, ?,  ?)";
  const currentTime = new Date();

  try {
    // Fetch data as JSON
    await runQuery(query, [
      rauId,
      rauName,
      currentTime.toISOString(),
      createdBy,
    ]);
  } catch (err) {
    console.error("Error executing query:", err.message);
  } finally {
  }
};

const insertProject = async (name, desc, metadata, createdBy) =>{
  const query = "INSERT INTO projects (name, description, metadata, created_at , created_by) VALUES (?, ?, ?)"
  const currentTime = new Date();

  try {
    // Fetch data as JSON
    await runQuery(query, [
      name,
      desc,
      metadata,
      currentTime.toISOString(),
      createdBy,
    ]);
  } catch (err) {
    console.error("Error executing query:", err.message);
  } finally {
  }
}

// Run the program to read data from PostgreSQL

module.exports = {
  getSheetsData: async function () {
    sheetsData = await getSheetsData();
    return sheetsData;
  },

  getColumnsData: async function (sheetId) {
    sheetsData = await getColumnsData(sheetId);
    return sheetsData;
  },

  insertExcelField: async function (
    rauId,
    sheetId,
    rowId,
    fieldId,
    fieldValue
  ) {
    insertFieldValue(rauId, sheetId, rowId, fieldId, fieldValue);
  },

  createRau: async function (rauId, rauName, createdBy) {
    insertRau(rauId, rauName, createdBy);
  },
  createRau: async function (name, desc, metadata, createdBy) {
    insertProject(name, desc, metadata,  createdBy);
  },
  getAllRauData: async function () {
    data = await getAllRaus();
    return data;
  },

  getSelectedFieldsData: async function () {
    data = await getSelectedColumnsData();
    return data;
  },
  getSheetDataFromDb: async function (rauId, sheetId) {
    // Define your SQL query
    const query = `SELECT rfv.row_id, fmd.field_name, rfv.field_value
        FROM rau_field_values AS rfv
        JOIN fields_meta_data AS fmd ON rfv.field_id = fmd.field_id
        WHERE rfv.rau_id = ? AND rfv.sheet_id = ?
        ORDER BY rfv.row_id, fmd.field_sl_no`;

    try {
      // Fetch data as JSON
      const data = await allQuery(query, [rauId, sheetId]);

      return data;
    } catch (err) {
      console.error("Error executing query:", err.message);
    }
  },
  getDataBySheetId: async function (rauId, fileName, sheetName) {
    const fileId = await getFileIdFromName(fileName);
    const sheetId = await getSheetIdFromName(sheetName, fileId);
    let result = [];
    let currentRow = {};
    let previousRowId = null;

    console.log("filedid,sheetid:", fileId, sheetId, fileName, sheetName);
    // Query to get header row
    const headerQuery = `
                          SELECT header_row
                          FROM sheet_meta_data
                          WHERE sheet_id = ?
                          AND file_id = ?
                          LIMIT 1`;

    // Query to get the sheet data
    const dataQuery = `
                        SELECT rfv.row_id, f.field_name, rfv.field_value
                        FROM rau_field_values AS rfv
                        JOIN fields_meta_data AS f ON f.field_id = rfv.field_id
                        WHERE rfv.rau_id = ?
                        AND rfv.sheet_id = ?
                        ORDER BY rfv.row_id, f.field_sl_no`;

    let headerRows = await allQuery(headerQuery, [sheetId, fileId]);
    const header = headerRows.map((row) => row.field_name);
    console.log("header", header, headerRows);
    let dataRows = await allQuery(dataQuery, [rauId, sheetId]);
    console.log("data", dataRows, rauId, sheetId);
    dataRows.forEach((row) => {
      if (previousRowId !== row.row_id) {
        if (previousRowId !== null) {
          result.push(currentRow);
        }
        currentRow = {};
        previousRowId = row.row_id;
      }

      currentRow[row.field_name] = row.field_value; // Use row.field_name directly
    });

    // Push the last row if it exists
    if (previousRowId !== null) {
      result.push(currentRow);
    }

    console.log(result);

    return result;
  },
};
