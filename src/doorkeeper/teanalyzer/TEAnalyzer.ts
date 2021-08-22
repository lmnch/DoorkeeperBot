import TimePeriod from "./TimePeriod";

const tpRegex = /([0-9])([ymdHMS])/gm;

export default class TEAnalyzer {
  /**
   * analyze
   */
  public analyze(txt: string): TimePeriod {
    if (!txt.startsWith("P")) return new TimePeriod();

    let tp = new TimePeriod();
    let res: RegExpMatchArray;
    while ((res = tpRegex.exec(txt)) !== null) {
      const a = res.groups[2];
      const q = res.groups[1];

      const quantizer = parseInt(q);

      switch (a) {
        case "y":
          tp = tp.plusYears(quantizer);
          break;
        case "M":
          tp = tp.plusMonths(quantizer);
          break;
        case "d":
          tp = tp.plusDays(quantizer);
          break;
        case "H":
          tp = tp.plusHours(quantizer);
          break;
        case "m":
          tp = tp.plusMinutes(quantizer);
          break;
        case "s":
          tp = tp.plusSeconds(quantizer);
          break;
      }
    }

    return tp;
  }
}
