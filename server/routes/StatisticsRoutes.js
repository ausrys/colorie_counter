const { Router } = require("express");
const router = Router();
const statisticsController = require("../controllers/statisticsController");
router.get(
  "/statistics/currentWeek",
  statisticsController.get_currentWeek_meals
);
router.get("/statistics/test", statisticsController.get_test_meals);
module.exports = router;
