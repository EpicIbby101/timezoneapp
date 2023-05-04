import React, { useState } from "react";
import moment from "moment-timezone";
import SleepScheduleForm from "./SleepScheduleForm";

const TimezoneForm = () => {
  const [myTimezone, setMyTimezone] = useState(
    moment.tz.guess() || moment.tz.names()[0]
  );
  const [theirTimezone, setTheirTimezone] = useState(moment.tz.names()[0]);
  const [timeDifference, setTimeDifference] = useState("");
  const [selectedTimezones, setSelectedTimezones] = useState({
    myTimezone,
    theirTimezone,
    timeDifference,
  });
  const [showSleepScheduleForm, setShowSleepScheduleForm] = useState(false);
  const timezones = moment.tz.names();

  const calculateAvailableTimeRanges = (
    userSleepTime,
    userWakeTime,
    otherPersonSleepTime,
    otherPersonWakeTime
  ) => {
    const startTime = moment().startOf("day");
    const endTime = moment().endOf("day");
    const step = 30; // Step size in minutes

    const format = "HH:mm";

    const userAwakeTime = {
      start: moment(userWakeTime, format),
      end: moment(userSleepTime, format),
    };

    const otherPersonAwakeTime = {
      start: moment(otherPersonWakeTime, format),
      end: moment(otherPersonSleepTime, format),
    };

    let currentTime = startTime.clone();
    const availableTimeRanges = [];
    let currentRange = null;

    while (currentTime.isBefore(endTime)) {
      const userAwake = currentTime.isBetween(
        userAwakeTime.start,
        userAwakeTime.end,
        null,
        "[)"
      );
      const otherPersonAwake = currentTime.isBetween(
        otherPersonAwakeTime.start,
        otherPersonAwakeTime.end,
        null,
        "[)"
      );

      if (userAwake && otherPersonAwake) {
        if (!currentRange) {
          currentRange = { start: currentTime.clone() };
        }
      } else {
        if (currentRange) {
          currentRange.end = currentTime.clone();
          availableTimeRanges.push(currentRange);
          currentRange = null;
        }
      }

      currentTime.add(step, "minutes");
    }

    if (currentRange) {
      currentRange.end = endTime.clone();
      availableTimeRanges.push(currentRange);
    }

    return availableTimeRanges;
  };

  const handleSleepScheduleSubmit = (
    userSleepTime,
    userWakeTime,
    otherPersonSleepTime,
    otherPersonWakeTime
  ) => {
    const convertToLocalTime = (time, fromTimezone, toTimezone) => {
      const localTime = moment.tz(
        `${moment().format("YYYY-MM-DD")}T${time}`,
        fromTimezone
      );
      return localTime.clone().tz(toTimezone).format("HH:mm");
    };
    const otherPersonSleepTimeInUserTimezone = convertToLocalTime(
      otherPersonSleepTime,
      theirTimezone,
      myTimezone
    );
    const otherPersonWakeTimeInUserTimezone = convertToLocalTime(
      otherPersonWakeTime,
      theirTimezone,
      myTimezone
    );

    console.log("I sleep from", userSleepTime, "to", userWakeTime);
    console.log(
      "Other person sleeps from (Local)",
      otherPersonSleepTime,
      "to",
      otherPersonWakeTime
    );
    console.log(
      "Other person sleeps from (Converted to User's Timezone)",
      otherPersonSleepTimeInUserTimezone,
      "to",
      otherPersonWakeTimeInUserTimezone
    );
    const availableTimeRanges = calculateAvailableTimeRanges(
      userSleepTime,
      userWakeTime,
      otherPersonSleepTimeInUserTimezone,
      otherPersonWakeTimeInUserTimezone
    );

    console.log(
      "Available Time Ranges:",
      availableTimeRanges.map((range) => ({
        start: range.start.format("HH:mm"),
        end: range.end.format("HH:mm"),
      }))
    );

    if (availableTimeRanges.length > 0) {
      console.log(
        "Best Time to Talk:",
        availableTimeRanges[0].start.format("HH:mm")
      );
    } else {
      console.log("No common available time found.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const myTime = moment.tz(myTimezone).format("h:mm A");
    const theirTime = moment.tz(theirTimezone).format("h:mm A");
    const theirOffset = moment.tz.zone(theirTimezone).utcOffset(moment());
    const myOffset = moment.tz.zone(myTimezone).utcOffset(moment());
    const timeDiffInMinutes = theirOffset - myOffset;
    const timeDiffInHours = timeDiffInMinutes / 60;
    const newTimeDifference = `The time difference is ${timeDiffInHours} hours. If it's ${myTime} for you, it'll be ${theirTime} for them.`;

    setSelectedTimezones({
      myTimezone,
      theirTimezone,
      timeDifference: newTimeDifference,
    });
    setTimeDifference(newTimeDifference);

    console.log(newTimeDifference);

    setShowSleepScheduleForm(true);
  };

  return (
    <>
      {!showSleepScheduleForm && (
        <div>
          <p className="mb-3">
            Please select your timezone and the timezone of the person you wish
            to talk to
          </p>
          <form
            className="flex flex-col items-center justify-center space-y-3 mt-3"
            onSubmit={handleSubmit}
          >
            <label htmlFor="myTimezone">My Timezone</label>
            <div>
              <select
                id="myTimezone"
                value={myTimezone}
                onChange={(e) => setMyTimezone(e.target.value)}
                className="text-black p-1 mb-3"
              >
                {timezones.map((timezone) => (
                  <option key={timezone} value={timezone}>
                    {timezone}
                  </option>
                ))}
              </select>
            </div>
            <label htmlFor="theirTimezone">Their Timezone</label>
            <div>
              <select
                id="theirTimezone"
                value={theirTimezone}
                onChange={(e) => setTheirTimezone(e.target.value)}
                className="text-black p-1 mb-3"
              >
                {timezones.map((timezone) => (
                  <option
                    key={timezone}
                    value={timezone}
                    className="text-black"
                  >
                    {timezone}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-14 rounded "
            >
              Submit
            </button>
            <div className="text-center">{timeDifference}</div>
          </form>
        </div>
      )}
      {showSleepScheduleForm && (
        <SleepScheduleForm onSubmit={handleSleepScheduleSubmit} />
      )}
    </>
  );
};

export default TimezoneForm;
