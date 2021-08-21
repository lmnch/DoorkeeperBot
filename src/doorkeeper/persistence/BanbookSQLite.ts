import { Database } from "sqlite3";
import Ban from "./Ban";
import Banbook from "./Banbook";

export default class BanbookSQLite implements Banbook {
  private _db: Database;

  public constructor(file: string) {
    if (file == null) file = ":memory:";
    this._db = new Database(file);
  }

  async initDB() {
    this._db.run(`CREATE TABLE IF NOT EXISTS bans (
      guildId string NOT NULL,
       userId string NOT NULL,
      expirationDate date NOT NULL,
      PRIMARY KEY (guildId, userId)
    ) `);
  }

  storeBan(ban: Ban): Promise<void> {
    return new Promise((res, rej) => {
      this._db.run(
        `INSERT INTO bans VALUES (?,?,?)`,
        [ban.guildId, ban.userId, ban.expirationTime],
        (error, result) => {
          if (error) {
            rej(error);
          } else {
            res();
          }
        }
      );
    });
  }

  loadBans(userId: string): Promise<Ban[]> {
    return new Promise((res, rej) => {
      this._db.all(
        `SELECT expirationTime as expTime, guildId as guild FROM ban WHERE userId=?`,
        [userId],
        (error, result: any[]) => {
          if (error) {
            rej(error);
          } else {
            const timestampNow = new Date();
            res(
              result
                .map((r) => {
                  const guildId = r.guild as string;
                  const time = r.expTime as Date;
                  return new Ban(guildId, userId, time);
                })
                .filter((b) => b.expirationTime > timestampNow)
            );
          }
        }
      );
    });
  }

  isBanned(guildId: string, userId: string): Promise<Ban> {
    return new Promise((res, rej) => {
      this._db.get(
        `SELECT expirationTime as expTime FROM ban WHERE guildId=?, userId=?`,
        [guildId, userId],
        (error, result: any) => {
          if (error) {
            rej(error);
          } else {
            const time = result.expTime as Date;
            if (new Date() < time) {
              res(new Ban(guildId, userId, time));
            } else {
              res(null);
            }
          }
        }
      );
    });
  }
}
