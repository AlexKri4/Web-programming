const express = require("express");
const options = require("./options");
const userRouter = require("./users");

// екземпляр серверу
const app = express();

// використовуємо вбудовані функції для декодування json тіла запитів та запитів в переданих через рядок
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// визначаэмо шлях для роутера http://localhost:3000/users
app.use("./users", userRouter);

// для усіх інших шляхів ставимо помилку 404
app.all("*", (req, res) => {
    res.status(404).send("Not found")
});

app.listen(options.port, () => {
    console.log(`Backend start on http://localhost:${options.port}`);
})
