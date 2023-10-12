type CaloriesSumForEachWeekDay = {
  Fri: number;
  Mon: number;
  Sat: number;
  Sun: number;
  Thu: number;
  Tue: number;
  Wed: number;
};
type weekNutrition = {
  calories: number;
  carbs: number;
  protein: number;
};
export type currentWeeksStatistics = {
  CaloriesSumForEachWeekDay: CaloriesSumForEachWeekDay;
  weekNutrition: weekNutrition;
};
