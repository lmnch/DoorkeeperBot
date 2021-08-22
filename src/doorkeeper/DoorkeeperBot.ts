import { Client, Guild, GuildMember, Snowflake } from "discord.js";
import TEAnalyzer from "./teanalyzer/TEAnalyzer";
import Banbook from "./persistence/Banbook";
import BanbookSQLite from "./persistence/BanbookSQLite";
import Ban from "./persistence/Ban";

export default class DoorkeeperBot {
  private client: Client;
  private token: string;
  private banMessageRegex: RegExp;
  private teAnalyzer: TEAnalyzer;
  private bans: Banbook;

  constructor(
    token: string,
    discordClient: Client,
    prefix: string = "ban!",
    b: Banbook = new BanbookSQLite()
  ) {
    this.client = discordClient;
    this.token = token;
    this.banMessageRegex = /ban! (\W+) (\W+)/;
    this.teAnalyzer = new TEAnalyzer();
    this.bans = b;
  }

  run(): void {
    this.client.login(this.token);
  }

  registerListener(): void {
    this.client.on("message", (msg) => {
      const txt = msg.content;
      const res = this.banMessageRegex.exec(txt);
      if (res.length === 1) {
        const banTimeString = res.groups[1];

        const tp = this.teAnalyzer.analyze(banTimeString);

        // player should be mentioned
        msg.mentions.members.forEach((user) => {
          const bannedUntil = tp.addToDate(new Date()).getTime();
          this.banPlayer(
            msg.guild,
            user,
            `You were banned until ${bannedUntil.toString()}`
          );
          this.bans.storeBan(Ban.banFor(msg.guildId, user.id, bannedUntil));
        });
      }
    });

    // TODO: add check when new player arrives
  }

  banPlayer(guild: Guild, member: GuildMember, reason = "Banned via Banbot") {
    guild.members.ban(member.user, { reason: reason });
  }
}
