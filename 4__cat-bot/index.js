const { Telegraf } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.TOKEN_BOT_API);
const chatId = 827663400; //замените на свое значение, подробнее ниже
const intervalMs = 1000;

const sendCat = () => {
  bot.telegram
    .sendPhoto(chatId, { source: `${__dirname}/images/cane.png` })
    .then(() => setTimeout(sendCat, intervalMs));
};

sendCat();
