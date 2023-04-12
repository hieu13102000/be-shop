
const cron = require('node-cron');
const { data } = require('./data');
const db = require("../models");
const initial = async () => {
  try {
    const createdProducts = await Promise.all(data.map(item => db.products.create(item)));
    console.log(`Restart product successfully. ${createdProducts.length} products added to the database.`);
  } catch (error) {
    console.error(`Restart product error: ${error.message}`);
  }
}


exports.restartDB = () => {
  cron.schedule('44 12 * * *', async () => {
    try {
      await db.products.sync({ force: true });
      await initial();
      console.log('Drop and Resync Db');
    } catch (error) {
      console.error(`Restart product error: ${error.message}`);
    }
  });
};
