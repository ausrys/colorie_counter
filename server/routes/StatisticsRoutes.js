const { Router } = require("express");
const router = Router();
const statisticsController = require("../controllers/statisticsController");
const { validateToken } = require("../auth/JWT");
router.post(
  "/statistics/currentWeek",
  validateToken,
  statisticsController.get_currentWeek_meals
);
router.get(
  "/statistics/test",
  validateToken,
  statisticsController.get_test_meals
);
module.exports = router;
