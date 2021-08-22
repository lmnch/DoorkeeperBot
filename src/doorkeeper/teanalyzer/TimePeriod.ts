export default class TimePeriod {
  private _years: number;
  private _months: number;
  private _days: number;
  private _hours: number;
  private _minutes: number;
  private _seconds: number;

  constructor(
    yyyy: number = 0,
    mm: number = 0,
    dd: number = 0,
    HH: number = 0,
    MM: number = 0,
    SS: number = 0
  ) {
    this._years = yyyy;
    this._months = mm;
    this._days = dd;
    this._hours = HH;
    this._minutes = MM;
    this._seconds = SS;
  }

  plusYears(y: number): TimePeriod {
    return new TimePeriod(
      this._years + y,
      this._months,
      this._days,
      this._hours,
      this._minutes,
      this._seconds
    );
  }

  plusMonths(m: number): TimePeriod {
    return new TimePeriod(
      this._years,
      this._months + m,
      this._days,
      this._hours,
      this._minutes,
      this._seconds
    );
  }

  plusDays(d: number): TimePeriod {
    return new TimePeriod(
      this._years,
      this._months,
      this._days + d,
      this._hours,
      this._minutes,
      this._seconds
    );
  }

  plusHours(h: number): TimePeriod {
    return new TimePeriod(
      this._years,
      this._months,
      this._days,
      this._hours + h,
      this._minutes,
      this._seconds
    );
  }

  plusMinutes(m: number): TimePeriod {
    return new TimePeriod(
      this._years,
      this._months,
      this._days,
      this._hours,
      this._minutes + m,
      this._seconds
    );
  }

  plusSeconds(s: number): TimePeriod {
    return new TimePeriod(
      this._years,
      this._months,
      this._days,
      this._hours,
      this._minutes,
      this._seconds + s
    );
  }

  addToDate(d: Date): Date {
    const yTime = 1000 * 60 * 60 * 24 * 365.25 * this._years;
    const mTime = 1000 * 60 * 60 * 24 * (365.25 / 12) * this._months;
    const dTime = 1000 * 60 * 60 * 24 * this._days;
    const hTime = 1000 * 60 * 60 * this._hours;
    const MTime = 1000 * 60 * this._minutes;
    const sTime = 1000 * this._seconds;
    return new Date(
      d.getTime() + yTime + mTime + dTime + hTime + MTime + sTime
    );
  }

  toString(): string {
    let str = "P";
    if (this._years) str += this._years + "y";
    if (this._months) str += this._months + "M";
    if (this._days) str += this._days + "d";
    if (this._hours) str += this._hours + "H";
    if (this._minutes) str += this._minutes + "m";
    if (this._seconds) str += this._seconds + "s";
    return str;
  }
}
