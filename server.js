const express = require("express");
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 8080;

const db = require("./db.js");
const controller = require('./controller/library.controller.js')
const validate = require('./validate/login.validate')
const userRouter = require('./routes/users/users.route.js')
const bookRouter = require('./routes/book/book.route.js')
const transectionRoute = require("./routes/transection/index.route.js");
const middlewareLogin = require('./middleware/authentication/login.middleware')
const app = express();
app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static('public'));


app.get("/", middlewareLogin.validateLogin, controller.server);
app.get('/login', (req, res) => {
  res.render('authentication/login',{
  })
})

app.post('/login', validate.validateLogin, (req, res) => {
  res.send('hello')
})

app.use("/transection", middlewareLogin.validateLogin, transectionRoute);

app.use('/book', middlewareLogin.validateLogin, middlewareLogin.UnauthMember, bookRouter)

app.use("/users", middlewareLogin.validateLogin, middlewareLogin.UnauthMember, userRouter)

app.listen(PORT, () => {
  console.log("Service running on PORT:" + PORT);
});
