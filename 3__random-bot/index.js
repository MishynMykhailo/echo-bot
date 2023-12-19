const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.TOKEN_BOT_API);

// Генерация рандомного числа
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// Генерация монеты
function getCoinSide() {
  if (getRandomInt(0, 1) === 0) {
    return "Орел";
  } else {
    return "Решка";
  }
}
// Добавить инлайн клавиатуру в ответ на сообщение для повторной генерации
const coinInlineKeyboard = Markup.inlineKeyboard([
  Markup.button.callback("Подбросить монетку ещё раз", "flip_a_coin"),
    ]);

bot.hears("Подбросить монетку", (ctx) =>
  ctx.reply(getCoinSide(), coinInlineKeyboard)
);

bot.action("flip_a_coin", async (ctx) => {
  await ctx.editMessageText(
    `${getCoinSide()}\nОтредактировано: ${new Date().toISOString()}`,
    coinInlineKeyboard
  );
});

const getRandomNumber = () => getRandomInt(0, 100);

const numberInlineKeyboard = Markup.inlineKeyboard([
  Markup.button.callback("Сгенерировать новое", "random_number"),
]);

// Случайное число
bot.hears("Случайное число", (ctx) =>
  ctx.reply(getRandomNumber().toString(), numberInlineKeyboard)
);

bot.action("random_number", async (ctx) => {
  await ctx.editMessageText(
    `${getRandomNumber()}\nОтредактировано: ${new Date().toISOString()}`,
    numberInlineKeyboard
  );
});

bot.use(async (ctx) => {
  await ctx.reply(
    "Что нужно сделать?",
    Markup.keyboard([["Подбросить монетку", "Случайное число"]]).resize()
  );
});

bot.launch().then(() => console.log("Started"));

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
