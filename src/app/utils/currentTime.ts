import moment from "moment-timezone";
import "moment/locale/fr";

export const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const localTime = (utcTimestamp: number) =>
  moment.utc(utcTimestamp).tz(userTimeZone).locale("fr").format("dddd, MMMM");

export const actualMonth = moment().locale("fr").format("MMMM");
export const actualYear = moment().format("YYYY");
export const timeCreated = (utcTimestamp: number) =>
  moment.utc(utcTimestamp).tz(userTimeZone).locale("fr").format("hh:mm a");

export const day = (utcTimestamp: number) =>
  moment
    .utc(utcTimestamp)
    .tz(userTimeZone)
    .locale("fr")
    .format("dddd Do MMMM, YYYY");

export const actualDate = moment().toString();
export const toFormatDate = (dateTime: string) =>
  moment(dateTime).format("DD-MM-YYYY");
