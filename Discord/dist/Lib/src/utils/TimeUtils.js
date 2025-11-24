"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateLogs = getDateLogs;
exports.dateToLogs = dateToLogs;
exports.getTomorrowMidnight = getTomorrowMidnight;
exports.getTodayMidnight = getTodayMidnight;
exports.getDayNumber = getDayNumber;
exports.millisecondsToMinutes = millisecondsToMinutes;
exports.minutesToMilliseconds = minutesToMilliseconds;
exports.hoursToMilliseconds = hoursToMilliseconds;
exports.hoursToMinutes = hoursToMinutes;
exports.minutesToHours = minutesToHours;
exports.millisecondsToHours = millisecondsToHours;
exports.millisecondsToSeconds = millisecondsToSeconds;
exports.secondsToMilliseconds = secondsToMilliseconds;
exports.daysToMilliseconds = daysToMilliseconds;
exports.hoursToSeconds = hoursToSeconds;
exports.datesAreOnSameDay = datesAreOnSameDay;
exports.finishInTimeDisplay = finishInTimeDisplay;
exports.dateDisplay = dateDisplay;
exports.getNextSundayMidnight = getNextSundayMidnight;
exports.getOneDayAgo = getOneDayAgo;
exports.todayIsSunday = todayIsSunday;
exports.getNextSaturdayMidnight = getNextSaturdayMidnight;
exports.resetIsNow = resetIsNow;
exports.seasonEndIsNow = seasonEndIsNow;
exports.parseTimeDifferenceFooter = parseTimeDifferenceFooter;
exports.printTimeBeforeDate = printTimeBeforeDate;
exports.getNextDay2AM = getNextDay2AM;
exports.getTimeFromXHoursAgo = getTimeFromXHoursAgo;
exports.minutesDisplay = minutesDisplay;
exports.getWeekNumber = getWeekNumber;
const Language_1 = require("../Language");
function getMinutesDisplayStringConstants(language) {
    return language === ""
        ? {
            hoursDisplay: "H",
            minutesDisplay: "Min",
            secondsDisplay: "s",
            linkWord: " ",
            plural: ""
        }
        : language === Language_1.LANGUAGE.FRENCH
            ? {
                hoursDisplay: "heure",
                minutesDisplay: "minute",
                secondsDisplay: "seconde",
                linkWord: " et ",
                plural: "s"
            }
            : {
                hoursDisplay: "hour",
                minutesDisplay: "minute",
                secondsDisplay: "second",
                linkWord: " and ",
                plural: "s"
            };
}
function getDateLogs() {
    return Math.trunc(Date.now() / 1000);
}
function dateToLogs(date) {
    return Math.trunc(date.valueOf() / 1000);
}
function getTomorrowMidnight() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow;
}
function getTodayMidnight() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
}
function getDayNumber() {
    return Math.floor(new Date().valueOf() / 8.64e7);
}
function millisecondsToMinutes(milliseconds) {
    return Math.round(milliseconds / 60000);
}
function minutesToMilliseconds(minutes) {
    return minutes * 60000;
}
function hoursToMilliseconds(hours) {
    return hours * 3600000;
}
function hoursToMinutes(hours) {
    return hours * 60;
}
function minutesToHours(minutes) {
    return minutes / 60;
}
function millisecondsToHours(milliseconds) {
    return milliseconds / 3600000;
}
function millisecondsToSeconds(milliseconds) {
    return milliseconds / 1000;
}
function secondsToMilliseconds(seconds) {
    return seconds * 1000;
}
function daysToMilliseconds(days) {
    return days * 24 * hoursToMilliseconds(1);
}
function hoursToSeconds(hours) {
    return hours * 3600;
}
function datesAreOnSameDay(first, second) {
    return first.getFullYear() === second.getFullYear()
        && first.getMonth() === second.getMonth()
        && first.getDate() === second.getDate();
}
function finishInTimeDisplay(finishDate) {
    return `<t:${Math.floor(millisecondsToSeconds(finishDate.valueOf()))
        .toString()}:R>`;
}
function dateDisplay(finishDate) {
    return `<t:${Math.floor(millisecondsToSeconds(finishDate.valueOf()))
        .toString()}:F>`;
}
function getNextSundayMidnight() {
    const now = new Date();
    const dateOfReset = new Date();
    dateOfReset.setDate(now.getDate() + (7 - now.getDay()) % 7);
    dateOfReset.setHours(23, 59, 59, 999);
    let dateOfResetTimestamp = dateOfReset.valueOf();
    while (dateOfResetTimestamp < now.valueOf()) {
        dateOfResetTimestamp += hoursToMilliseconds(24 * 7);
    }
    return dateOfResetTimestamp;
}
function getOneDayAgo() {
    return Date.now() - hoursToMilliseconds(24);
}
function todayIsSunday() {
    const now = new Date();
    return now.getDay() === 0;
}
function getNextSaturdayMidnight() {
    const now = new Date();
    const dateOfReset = new Date();
    dateOfReset.setDate(now.getDate() + (6 - now.getDay()) % 7);
    dateOfReset.setHours(23, 59, 59, 999);
    let dateOfResetTimestamp = dateOfReset.valueOf();
    while (dateOfResetTimestamp < now.valueOf()) {
        dateOfResetTimestamp += 1000 * 60 * 60 * 24 * 7;
    }
    return dateOfResetTimestamp;
}
function resetIsNow() {
    return getNextSundayMidnight() - Date.now() <= minutesToMilliseconds(5);
}
function seasonEndIsNow() {
    return getNextSaturdayMidnight() - Date.now() <= minutesToMilliseconds(20);
}
function parseTimeDifferenceFooter(date1, date2, language) {
    if (date1 > date2) {
        date1 = [date2, date2 = date1][0];
    }
    let seconds = Math.floor((date2.valueOf() - date1.valueOf()) / 1000);
    let parsed = "";
    const days = Math.floor(seconds / (24 * 60 * 60));
    if (days > 0) {
        parsed += days + (language === Language_1.LANGUAGE.FRENCH ? " J " : " D ");
        seconds -= days * 24 * 60 * 60;
    }
    const hours = Math.floor(seconds / (60 * 60));
    const timeConstants = getMinutesDisplayStringConstants("");
    if (hours !== 0) {
        parsed += `${hours} ${timeConstants.hoursDisplay} `;
    }
    seconds -= hours * 60 * 60;
    const minutes = Math.floor(seconds / 60);
    parsed += `${minutes} ${timeConstants.minutesDisplay} `;
    seconds -= minutes * 60;
    parsed += `${seconds} ${timeConstants.secondsDisplay}`;
    return parsed;
}
function printTimeBeforeDate(date) {
    date /= 1000;
    return `<t:${Math.floor(date)
        .valueOf()
        .toString()}:R>`;
}
function getNextDay2AM() {
    const now = new Date();
    const dateOfReset = new Date();
    dateOfReset.setHours(1, 59, 59, 999);
    if (dateOfReset < now) {
        dateOfReset.setDate(dateOfReset.getDate() + 1);
    }
    return new Date(dateOfReset);
}
function getTimeFromXHoursAgo(hours) {
    const time = new Date();
    time.setHours(time.getHours() - hours);
    return time;
}
function minutesDisplay(minutes, language = Language_1.LANGUAGE.DEFAULT_LANGUAGE) {
    const hours = Math.floor(minutesToHours(minutes));
    minutes = Math.floor(minutes % 60);
    const displayConstantValues = getMinutesDisplayStringConstants(language);
    const display = [
        hours > 0 ? `${hours} ${displayConstantValues.hoursDisplay}${hours > 1 ? displayConstantValues.plural : ""}` : "",
        minutes > 0 ? `${minutes} ${displayConstantValues.minutesDisplay}${minutes > 1 ? displayConstantValues.plural : ""}` : ""
    ].filter(v => v !== "")
        .join(displayConstantValues.linkWord);
    return display === "" ? "< 1 Min" : display;
}
function getWeekNumber(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.valueOf() - firstDayOfYear.valueOf()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}
//# sourceMappingURL=TimeUtils.js.map