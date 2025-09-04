
const Fastify = require('fastify');
const { Sequelize, DataTypes } = require('sequelize');
const fastify = Fastify();
fastify.register(require('@fastify/cors'), { origin: '*' });

const sequelize = new Sequelize('postgres://som:@localhost:5432/fakturera_db');

const Translation = sequelize.define('Translation', {
  key: DataTypes.STRING,
  language: DataTypes.STRING,
  value: DataTypes.STRING,
}, {
  tableName: 'translations',
  timestamps: false,
});

fastify.get('/translations/:lang', async (request, reply) => {
  const { lang } = request.params;
  const translations = await Translation.findAll({ where: { language: lang } });
  const result = {};
  translations.forEach(t => result[t.key] = t.value);
  return result;
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await fastify.listen({ port: 3000 });
    console.log('Server running on http://localhost:3000');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
