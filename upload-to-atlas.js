import { MongoClient } from "mongodb";

const LOCAL_URI = "mongodb://127.0.0.1:27017";
const DATABASE = "hotelBooking";
const ATLAS_URI = process.env.ATLAS_URI;

async function main() {
  if (!ATLAS_URI) {
    throw new Error("ATLAS_URI is not set. Set it again in this PowerShell session.");
  }

  const local = new MongoClient(LOCAL_URI);
  const atlas = new MongoClient(ATLAS_URI);

  try {
    await local.connect();
    console.log("Connected to local MongoDB.");

    await atlas.connect();
    console.log("Connected to MongoDB Atlas.");

    const sourceDb = local.db(DATABASE);
    const targetDb = atlas.db(DATABASE);

    for (const name of ["hotels", "users"]) {
      const documents = await sourceDb.collection(name).find({}).toArray();

      if (documents.length === 0) {
        console.log(`${name}: no local documents; skipped.`);
        continue;
      }

      const target = targetDb.collection(name);
      const existing = await target.countDocuments();

      if (existing > 0) {
        throw new Error(
          `Atlas collection "${name}" already contains ${existing} documents. Nothing was inserted into this collection. Check the Atlas data before retrying.`
        );
      }

      await target.insertMany(documents);
      console.log(`${name}: copied ${documents.length} documents to Atlas.`);
    }

    console.log("Upload completed. Local data was not changed.");
  } finally {
    await Promise.allSettled([local.close(), atlas.close()]);
  }
}

main().catch((error) => {
  console.error("Upload failed:", error.message);
  process.exitCode = 1;
});
