import { Client } from "discord.js";
import DoorkeeperBot from "./doorkeeper/DoorkeeperBot";

const client = new Client();
const token = "";

const bot = new DoorkeeperBot(token, client);
bot.run();
