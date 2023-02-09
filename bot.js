


const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);




bot.start(async(ctx) => {
    const tours = await Tour.find();
    for(i=0;i<tours.length-2;i++)
    {ctx.reply(tours[i].d)}}
    
    );



bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();

module.exports=bot