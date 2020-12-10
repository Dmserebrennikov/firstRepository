'use strict';

function unluckyDays(year) {
  let date = new Date(year, 0),
    count = 0;
  while (date.getFullYear() < year + 1) {
    if (date.getDay() == 5 && date.getDate() == 13) count++;
    date.setDate(date.getDate() + 1);
  }
  return count;
}
