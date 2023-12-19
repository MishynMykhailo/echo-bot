const { Telegraf } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.TOKEN_BOT_API);

bot.use(async (ctx) => {
  await ctx.reply(JSON.stringify(ctx.update, null, 2));
});

// Example how i can use middleware
const middleware1 = (ctx, next) => {
  console.log("middleware1");
  next();
};
const middleware2 = (ctx, next) => {
    console.log("middleware2");
    next()
};
const middleware3 = (ctx, next) => {
  console.log("middleware3");
};

bot.use(middleware1);
bot.use(middleware2);
bot.use(middleware3);

try {
  bot.launch();
  console.log("Started");
} catch (error) {
  console.log(error);
}

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));