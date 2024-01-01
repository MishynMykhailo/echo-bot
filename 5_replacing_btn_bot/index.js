const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.TOKEN_BOT_API);

let userState = {}; // Объект для отслеживания состояний пользователей

const startMessage = `<b>Тестовый текст</b>`;

bot.command("menu", (ctx) => {
  userState[ctx.from.id] = "menu"; // Устанавливаем состояние "menu" для пользователя
  ctx.reply(startMessage, {
    parse_mode: "HTML",
    ...Markup.inlineKeyboard([
      [Markup.button.callback("Кнопка 1", "button_1")],
      [Markup.button.callback("Кнопка 2", "button_2")],
      [Markup.button.callback("Кнопка 3", "button_3")],
    ]),
  });
});

bot.action("menu", (ctx) => {
  userState[ctx.from.id] = "menu"; // Устанавливаем состояние "menu" для пользователя
  ctx.editMessageText(startMessage, {
    parse_mode: "HTML",
    ...Markup.inlineKeyboard([
      [Markup.button.callback("Кнопка 1", "button_1")],
      [Markup.button.callback("Кнопка 2", "button_2")],
      [Markup.button.callback("Кнопка 3", "button_3")],
    ]),
  });
});

bot.action("button_1", async (ctx) => {
  // Отправляем новое сообщение вместо редактирования
  await ctx.editMessageText(
    "Кнопка 1",
    Markup.inlineKeyboard([[Markup.button.callback("Главное меню", "menu")]])
  );
  userState[ctx.from.id] = "menu"; // Пользователь вернулся в главное меню
});

bot.action("button_2", async (ctx) => {
  await ctx.reply("Кнопка 2");
});

bot.action("button_3", async (ctx) => {
  await ctx.reply("Кнопка 3");
});

// Запуск бота
try {
  bot.launch();
  console.log("start bot");
} catch (error) {
  console.log(error);
}
