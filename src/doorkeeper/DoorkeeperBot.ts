import { Client } from "discord.js";

export default class DoorkeeperBot {
  private client: Client;
  private token: string;

  constructor(token: string, discordClient: Client) {
    this.client = discordClient;
    this.token = token;
  }

  run(): void {
    this.client.login(this.token);
  }

  registerListener(): void {
    // TODO
  }
}
