const cron = require("node-cron");
const { Op } = require("sequelize");
const { Meals } = require("../models");
// Schedule a task to run daily at midnight (adjust the schedule as needed)
const oldRecordsRemoval = () =>
  cron.schedule("0 0 * * *", async () => {
    try {
      // Calculate the timestamp for records to be deleted (e.g., records older than 7 days)
      const thresholdDate = new Date();
      thresholdDate.setDate(thresholdDate.getDate() - 7); // Change 7 to the desired time threshold

      // Delete records older than the threshold date
      const deletedCount = await Meals.destroy({
        where: {
          createdAt: {
            [Op.lt]: thresholdDate,
          },
          isPortion: 0,
        },
      });

      console.log(`Deleted ${deletedCount} records.`);
    } catch (error) {
      console.error("Error deleting records:", error);
    }
  });
module.exports = oldRecordsRemoval;
