import { Snowflake } from "discord.js";
import Ban from "./Ban";

export default interface Banbook {
  storeBan(ban: Ban): Promise<void>;
  loadBans(userId: Snowflake): Promise<Ban[]>;
  isBanned(guildId: Snowflake, userId: Snowflake): Promise<Ban>;
}
