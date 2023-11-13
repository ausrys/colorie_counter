# Calorie counter

---

**Colorie Counter** is a web application that allows users to create and track their meals by recording the nutritional information of the ingredients used. Users can create meals, portion them, add products and save them in the database for future reference, see the statistics in a chosen period in time.

The project is hosted on [Calorie Counter](https://colorie-counter.vercel.app/). <mark>_It is important to have some patience when visiting the site, because the back-end firstly needs to spin up after a request and the database is very slow to respond._</mark>

## Tech stack

---

**Front-end**

- React + TS
- Tailwind CSS
- Redux , Redux Toolkit
- Axios
- Chart.js
- React hook forms
- Reusable Components
- Zod

---

**Back-end**

- Express
- Bcrypt
- Cookie-parser
- Jsonwebtoken
- mysql12
- sequelize
- node cron
- luxon

---

## More about the project

An user who wants to use this web application can register and then login. Upon successful registration and login a cookie is created for a user in the back-end and then sent to the front-end via request, this cookie helps to authenticate and authorize user actions. User can make meals by adding various products together and then save it. Before saving the meal, the user can choose if the meal that was made is a full meal user is going to eat, or if the user is going to eat a portion of that meal. All the meals are saved in the mysql database with the help of sequelize ORM. Meals that were eaten as a whole portion are shown in the statistics, meals that were not a full portion can be portioned later and theu can also be modified. To save space meals that were not portioned or are older than a week get deleted via cron job every midnight. Every meal saves the nutrition values of the whole meal (protein, carbs, calories, weight) and the products that were added. While checking statists the user can see information about the total value of calories and other nutrition values he consumed.
