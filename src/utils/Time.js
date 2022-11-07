// dayjs imports
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import duration from "dayjs/plugin/duration";
import objectSupport from "dayjs/plugin/objectSupport";

// dayjs config
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(objectSupport);

const getOffset = (timezone, defaultTimezone) => {
  return dayjs
    .duration({
      minutes:
        dayjs().tz(timezone).$offset - dayjs().tz(defaultTimezone).$offset,
    })
    .asHours();
};

const yesterdayBreakdown = (offset) => {
  let duration = 0;
  let am = 0;
  let pm = 0;
  if (offset < 0) {
    duration = Math.abs(offset);
    if (duration <= 12) {
      pm = duration;
    } else if (duration > 12) {
      [am, pm] = [duration - 12, 12];
    }
  }
  return {
    duration: duration,
    period: {
      am: am,
      pm: pm,
    },
  };
};

const todayBreakdown = (offset) => {
  let duration = 0;
  let am = 0;
  let pm = 0;
  if (24 - Math.abs(offset) > 0) {
    duration = 24 - Math.abs(offset);
    if (duration <= 12) {
      if (offset < 0) {
        am = duration;
      } else {
        pm = duration;
      }
    }
    if (duration > 12) {
      if (offset < 0) {
        [am, pm] = [12, duration - 12];
      } else {
        [am, pm] = [duration - 12, 12];
      }
    }
  }
  return {
    duration: duration,
    period: {
      am: am,
      pm: pm,
    },
  };
};

const tomorrowBreakdown = (offset) => {
  let duration = 0;
  let am = 0;
  let pm = 0;
  if (offset > 0) {
    duration = offset;
    if (duration <= 12) {
      am = duration;
    } else if (duration > 12) {
      [am, pm] = [12, duration - 12];
    }
  }
  return {
    duration: duration,
    period: {
      am: am,
      pm: pm,
    },
  };
};

export const getBreakdown = (timezone, defaultTimezone) => {
  const offset = getOffset(timezone, defaultTimezone);
  return {
    offset: offset,
    breakdown: {
      yesterday: yesterdayBreakdown(offset),
      today: todayBreakdown(offset),
      tomorrow: tomorrowBreakdown(offset),
    },
  };
};

export const formatTZTime = (time, timezone) => {
  return dayjs(time).tz(timezone).format("hh:mm");
};

export const minutesElapsedInDay = (time, timezone) => {
  return (
    dayjs(time).tz(timezone).minute() + dayjs(time).tz(timezone).hour() * 60
  );
};

export const guessTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const getAMPM = (time, timezone) => {
  return dayjs(time).tz(timezone).format("A");
};

export const getGMTOffset = (timezone) => {
  return dayjs().tz(timezone).format("Z");
};

export const getTime = (timezone) => {
  return dayjs().tz(timezone).format("hh:mm A");
};
