const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Tour = require("./modals/tourModel");

dotenv.config({ path: "./config.env" });
console.log(process.env.DATABASE);
const db = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);
// mongoose
//   .connect(db, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then(console.log("connection successful"));4


const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);



console.log(db);
mongoose.connect(db, (err) => {
  if (err) throw err;
  console.log("connected to MongoDB");
});

const app = require("./app");
const port = 3000;
app.listen(port, () => {
  console.log("app running on port 3000");
});









bot.start(async(ctx) => {
    const tours = await Tour.find();
    console.log(tours.length)
   for(let i=0;i<tours.length-3;i++)
    { await ctx.reply(tours[i].name)}}
    
    );



bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();