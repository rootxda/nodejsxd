const express = require("express");
const app = express();
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);
const morgan = require("morgan");



const Tour = require("./modals/tourModel");

app.use(express.json());
app.use(morgan("dev"));

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");




bot.start(async(ctx) => {
    const tours = await Tour.find();
    
    ctx.reply(tours[tours.length-1].name)});



bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();



// app.get("/", (req, res) => {
//   res.status(404).json({ message: "hiii", msg: "hello" });
// });

// app.post("/", (req, res) => {
//   res.send("hii post");
// });

//middlewares----------------------

//functions-------------------------------------

// app.get("/api/v1/tour", getAlltours);
// app.get("/api/v1/tour/:id", getTour);
// app.post("/api/v1/tour", createTour);
// app.delete("/api/v1/tour/:id", deleteTour);

//routes-------------------------------------------------
app.use("/api/v1/tour", tourRouter);
app.use("/api/v1/users", userRouter);
// app
//   .route("/api/v1/users/:id")
//   .get(getUser)
//   .patch(updateUser)
//   .delete(deleteUser);
module.exports = app;
