import moment from "moment-timezone";
import "moment/locale/fr";

export const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const localTime = (utcTimestamp: number) =>
  moment.utc(utcTimestamp).tz(userTimeZone).locale("fr").format("dddd, MMMM");

export const actualMonth = moment().locale("fr").format("MMMM");
export const actualYear = moment().format("YYYY");
export const timeCreated = (utcTimestamp: number) =>
  moment.utc(utcTimestamp).tz(userTimeZone).locale("fr").format("hh:mm");
