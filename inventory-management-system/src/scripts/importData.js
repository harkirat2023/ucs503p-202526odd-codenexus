// /**
//  * importData.js
//  * ------------------------
//  * Imports Indian retail product data from CSV into MongoDB.
//  * For each product:
//  *  → Creates Product document
//  *  → Generates Inventory entry (random stock)
//  *  → Adds Barcode record (EAN-13 format)
//  *
//  * Run using: node src/scripts/importData.js
//  */

// const fs = require("fs");
// const path = require("path");
// const csv = require("csv-parser");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// // Load .env from root directory
// dotenv.config({path: path.resolve(__dirname, "../../.env")});

// // Import Mongoose models
// const Product = require("../models/product.model");
// const Inventory = require("../models/inventory.model");
// const Barcode = require("../models/barcode.model");

// // -------------------------------
// // 1️⃣ MongoDB Connection
// // -------------------------------
// if (!process.env.MONGODB_URI) {
//   console.error("❌ MONGODB_URI not found in .env");
//   process.exit(1);
// }

// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log("✅ Connected to MongoDB"))
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err);
//     process.exit(1);
//   });

// // -------------------------------
// // 2️⃣ Import CSV Data
// // -------------------------------
// const importData = async () => {
//   const products = [];
//   let counter = 1;

//   // CSV File Path (update if needed)
//   const csvFilePath = path.resolve(
//     __dirname,
//     "../data/INDIA_RETAIL_DATA_FULL.csv"
//   );

//   console.log("📦 Reading data from:", csvFilePath);

//   // Stream CSV file
//   fs.createReadStream(csvFilePath)
//     .pipe(csv())
//     .on("data", (row) => {
//       try {
//         // Push formatted product into array
//         products.push({
//           name: row.product?.trim() || `Unnamed Product ${counter}`,
//           category: row.category?.trim() || "General",
//           unitPrice: parseFloat(row.sale_price) || 0,
//           barcode: row.barcode?.trim() || generateBarcode(row.index || counter),
//           brand: row.brand?.trim() || "Generic",
//           description: row.description?.trim() || "No description available",
//         });
//         counter++;
//       } catch (err) {
//         console.warn("⚠️ Skipping row due to error:", err.message);
//       }
//     })
//     .on("end", async () => {
//       console.log(`📊 Total products read from CSV: ${products.length}`);

//       try {
//         // -------------------------------
//         // 3️⃣ Insert Products
//         // -------------------------------
//         const insertedProducts = await Product.insertMany(products);
//         console.log(`✅ ${insertedProducts.length} products imported.`);

//         // -------------------------------
//         // 4️⃣ Create Inventory Records
//         // -------------------------------
//         const inventoryData = insertedProducts.map((p) => ({
//           productId: p._id,
//           quantity: Math.floor(Math.random() * 90) + 10, // 10–100 random stock
//           location: "Main Warehouse",
//         }));
//         await Inventory.insertMany(inventoryData);
//         console.log("📦 Inventory records created.");

//         // -------------------------------
//         // 5️⃣ Create Barcode Records
//         // -------------------------------
//         const barcodeData = insertedProducts.map((p) => ({
//           code: p.barcode,
//           type: "EAN-13",
//           productId: p._id,
//         }));
//         await Barcode.insertMany(barcodeData);
//         console.log("🏷️ Barcode records created.");

//         console.log("🎉 Import completed successfully!");
//         process.exit(0);
//       } catch (error) {
//         console.error("❌ Import failed:", error);
//         process.exit(1);
//       }
//     });
// };

// // -------------------------------
// // 6️⃣ Helper: Generate EAN-13 Barcode
// // -------------------------------
// const generateBarcode = (index) => {
//   // EAN-13 codes start with 890 (India’s GS1 prefix)
//   return "890" + String(index).padStart(10, "0");
// };

// // -------------------------------
// // 7️⃣ Run Import
// // -------------------------------
// importData();

/**
 * importData.js
 * ------------------------
 * Imports product data from INDIA_RETAIL_DATA_FULL.csv into MongoDB.
 * 
 * For each CSV row:
 *   → Creates a Product document
 *   → Creates an Inventory record with random stock
 *   → Creates a Barcode entry linked to the Product
 *
 * Run using: node src/scripts/importData.js
 */

const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Mongoose models
const Product = require("../models/product.model");
const Inventory = require("../models/inventory.model");
const Barcode = require("../models/barcode.model");

// -------------------------------
// 1️⃣ Connect to MongoDB
// -------------------------------
if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI not found in .env");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// -------------------------------
// 2️⃣ Helper: Generate EAN Barcode (fallback if missing)
// -------------------------------
const generateBarcode = (index) => {
  // EAN-13 barcodes begin with 890 (India GS1)
  return "890" + String(index).padStart(10, "0");
};

// -------------------------------
// 3️⃣ Import CSV Data
// -------------------------------
const importData = async () => {
  const products = [];
  let index = 1;

  const csvFilePath = path.resolve(
    __dirname,
    "../data/INDIA_RETAIL_DATA_FULL.csv"
  );
  console.log("📦 Reading CSV from:", csvFilePath);

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row) => {
      try {
        // Ensure all fields are safe
        const name = row.product?.trim() || `Unnamed Product ${index}`;
        const category = row.category?.trim() || "General";
        const unitPrice = parseFloat(row.sale_price) || 0;
        const barcode = row.barcode?.trim() || generateBarcode(index);

        products.push({
          name,
          category,
          unitPrice,
          barcode,
        });

        index++;
      } catch (err) {
        console.warn("⚠️ Skipping invalid row:", err.message);
      }
    })
    .on("end", async () => {
      console.log(`📊 Total rows read from CSV: ${products.length}`);

      try {
        // -------------------------------
        // 4️⃣ Insert Products
        // -------------------------------
        // Insert products while skipping duplicates
        const insertedProducts = [];

        for (const prod of products) {
          try {
            const existing = await Product.findOne({barcode: prod.barcode});
            if (existing) {
              console.log(`⚠️ Skipping duplicate barcode: ${prod.barcode}`);
              continue;
            }

            const newProduct = new Product(prod);
            await newProduct.save();
            insertedProducts.push(newProduct);
          } catch (err) {
            console.warn(
              `⚠️ Failed to insert product ${prod.name}:`,
              err.message
            );
          }
        }

        // -------------------------------
        // 5️⃣ Create Inventory Records
        // -------------------------------
        const inventoryData = insertedProducts.map((product) => ({
          productId: product._id,
          quantity: Math.floor(Math.random() * 90) + 10, // 10–100
          location: "Main Warehouse",
        }));

        await Inventory.insertMany(inventoryData);
        console.log("📦 Inventory records created.");

        // -------------------------------
        // 6️⃣ Create Barcode Records
        // -------------------------------
        const barcodeData = insertedProducts.map((product) => ({
          code: product.barcode,
          type: "Code128", // default barcode type
          productId: product._id,
        }));

        await Barcode.insertMany(barcodeData);
        console.log("🏷️ Barcode records created.");

        console.log("🎉 Import completed successfully!");
        process.exit(0);
      } catch (error) {
        console.error("❌ Import failed:", error);
        process.exit(1);
      }
    });
};

// -------------------------------
// 7️⃣ Start Import
// -------------------------------
importData();
