export default class Ban {
  private _guildId: string;
  private _userId: string;
  private _expirationTime: Date;

  constructor(guild: string, user: string, expiryTime: Date) {
    this._guildId = guild;
    this._userId = user;
    this._expirationTime = expiryTime;
  }

  public static banFor(guild: string, user: string, time: number): Ban {
    return new Ban(guild, user, new Date(new Date().getTime() + time));
  }

  public get guildId(): string {
    return this._guildId;
  }

  public get userId(): string {
    return this._userId;
  }

  public get expirationTime(): Date {
    return this._expirationTime;
  }
}
