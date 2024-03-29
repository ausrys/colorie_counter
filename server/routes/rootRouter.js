const { Router } = require("express");
const productsRoutes = require("./ProductsRoutes");
const mealsRoutes = require("./MealsRoutes");
const statisticsRoutes = require("./StatisticsRoutes");
const authRoutes = require("./AuthRoutes");
// root router where all the routes are being used and exported to index.js

const rootRouter = Router();
rootRouter.use(productsRoutes);
rootRouter.use(mealsRoutes);
rootRouter.use(statisticsRoutes);
rootRouter.use(authRoutes);

module.exports = rootRouter;
