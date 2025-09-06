require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const {
  sequelize,
  Translation,
  createDatabase,
  seedDatabase,
} = require("./db");

// Initialize Fastify server with logger
const Fastify = require("fastify");
const fastify = Fastify({ logger: true });

fastify.register(require("@fastify/cors"), { origin: process.env.CORS_ORIGIN });

// Routes
fastify.get("/translations/:lang", async (request, reply) => {
  try {
    const { lang } = request.params;
    const translations = await Translation.findAll({
      where: { language: lang },
    });
    const result = {};
    translations.forEach((t) => (result[t.key] = t.value));
    return result;
  } catch (error) {
    fastify.log.error("Error fetching translations:", error);
    reply.status(500).send({ error: "Internal Server Error" });
  }
});

// Start server and seed database
const startServer = async () => {
  try {
    await createDatabase();
    await sequelize.authenticate();
    fastify.log.info("Database connection established.");
    if (
      process.env.NODE_ENV !== "production" ||
      process.env.SEED_DATABASE === "true"
    ) {
      await seedDatabase();
    } else {
      fastify.log.info("Skipping seeding in production.");
    }
    fastify.listen({ port: process.env.PORT || 3000, host: "0.0.0.0" });
    fastify.log.info(`Server running on ${process.env.PORT || 3000}`);
  } catch (err) {
    fastify.log.error("Error starting server:", err);
    process.exit(1);
  }
};

startServer();
