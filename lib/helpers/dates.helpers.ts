export const DAYS_IN_WEEK = 7;
export const DAYS_IN_MONTH = 30;
export const DAYS_IN_YEAR = 365;
export const HOURS_IN_DAY = 24;
export const MINUTES_IN_HOUR = 60;
export const SECONDS_IN_MINUTE = 60;

export const SECONDS_IN_HOUR = MINUTES_IN_HOUR * SECONDS_IN_MINUTE;
export const SECONDS_IN_DAY = HOURS_IN_DAY * SECONDS_IN_HOUR;
export const SECONDS_IN_WEEK = DAYS_IN_WEEK * SECONDS_IN_DAY;
export const SECONDS_IN_MONTH = DAYS_IN_MONTH * SECONDS_IN_DAY;

export const BLOCK_DURATION = 15;
export const BLOCKS_IN_MINUTE = SECONDS_IN_MINUTE / BLOCK_DURATION;
export const BLOCKS_IN_HOUR = SECONDS_IN_HOUR / BLOCK_DURATION;
export const BLOCKS_IN_DAY = SECONDS_IN_DAY / BLOCK_DURATION;
export const BLOCKS_IN_YEAR = DAYS_IN_YEAR * BLOCKS_IN_DAY;
