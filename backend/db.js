const { Sequelize, DataTypes } = require("sequelize");
const { Client } = require("pg");
const {
  enParagraphs,
  svParagraphs,
  translations,
} = require("./translationsData");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const cred = `postgres://${DB_USER}:${
  DB_PASSWORD || ""
}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

// Initialize Sequelize
const sequelize = new Sequelize(cred, { logging: false });

// Table definition name Translation
const Translation = sequelize.define(
  "Translation",
  {
    key: { type: DataTypes.STRING, allowNull: false },
    language: { type: DataTypes.STRING, allowNull: false },
    value: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    tableName: "translations",
    timestamps: false,
    indexes: [{ unique: true, fields: ["key", "language"] }],
  }
);

// Push translations
enParagraphs.forEach((p, index) =>
  translations.push({
    key: `terms_paragraph_${index + 1}`,
    language: "en",
    value: p,
  })
);
svParagraphs.forEach((p, index) =>
  translations.push({
    key: `terms_paragraph_${index + 1}`,
    language: "sv",
    value: p,
  })
);

// Create database if it doesn't exist
async function createDatabase() {
  const client = new Client({
    user: DB_USER,
    password: DB_PASSWORD || "",
    host: DB_HOST,
    port: DB_PORT,
    database: "postgres",
  });

  try {
    await client.connect();
    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [DB_NAME]
    );
    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE ${DB_NAME};`);
      console.log(`Database ${DB_NAME} created successfully!`);
    } else {
      console.log(`Database ${DB_NAME} already exists, skipped creating`);
    }
  } catch (error) {
    console.error("Error creating database:", error);
    throw error;
  } finally {
    await client.end();
  }
}

// Seed the database
async function seedDatabase() {
  try {
    await sequelize.sync({ force: false });
    console.log("Translations table synced successfully.");

    const count = await Translation.count();
    if (count === 0 || process.env.SEED_DATABASE === "true") {
      console.log("Seeding database...");
      for (const translation of translations) {
        await Translation.upsert(
          {
            key: translation.key,
            language: translation.language,
            value: translation.value,
          },
          {
            conflictFields: ["key", "language"],
            fields: ["value"],
          }
        );
        console.log(
          `Processed translation: ${translation.key} (${translation.language})`
        );
      }
      console.log("Database seeded successfully!");
    } else {
      console.log("Database already seeded, skipping.");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

module.exports = {
  sequelize,
  Translation,
  createDatabase,
  seedDatabase,
};
