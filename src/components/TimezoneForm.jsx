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
  const [notification, setNotification] = useState(null);
  const closeNotification = () => {
    setNotification(null);
  };

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
      const userAwake =
        currentTime.isSame(userAwakeTime.start) ||
        currentTime.isSame(userAwakeTime.end) ||
        currentTime.isBetween(
          userAwakeTime.start,
          userAwakeTime.end,
          null,
          "[]"
        );

      const otherPersonAwake =
        currentTime.isSame(otherPersonAwakeTime.start) ||
        currentTime.isSame(otherPersonAwakeTime.end) ||
        currentTime.isBetween(
          otherPersonAwakeTime.start,
          otherPersonAwakeTime.end,
          null,
          "[]"
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

    availableTimeRanges.forEach((range) => {
      range.end.subtract(1.5, "hours");
    });
  
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

    const availableTimeRanges = calculateAvailableTimeRanges(
      userSleepTime,
      userWakeTime,
      otherPersonSleepTimeInUserTimezone,
      otherPersonWakeTimeInUserTimezone
    );

    const timeDifferenceMessage = selectedTimezones.timeDifference;
    const userSleepScheduleMessage = `You sleep from ${userSleepTime} to ${userWakeTime}`
    const convertedSleepScheduleMessage = <p>The other person sleeps from <br /> {otherPersonSleepTime} to {otherPersonWakeTime} <br /> In your local timezone, that&apos;s <br /> {otherPersonSleepTimeInUserTimezone} to {otherPersonWakeTimeInUserTimezone}</p>

    if (availableTimeRanges.length > 0) {
      const availableTimes = availableTimeRanges.map((range) =>
        `${range.start.format("HH:mm")} - ${range.end.format("HH:mm")}`
      );
      const availableTimesInOtherPersonTimezone = availableTimeRanges.map((range) => {
        const startInOtherPersonTimezone = range.start.clone().tz(theirTimezone);
        const endInOtherPersonTimezone = range.end.clone().tz(theirTimezone);
        return `${startInOtherPersonTimezone.format("HH:mm")} - ${endInOtherPersonTimezone.format("HH:mm")}`
      })
      setNotification({ timeDifferenceMessage, userSleepScheduleMessage, convertedSleepScheduleMessage, availableTimesInOtherPersonTimezone, availableTimes });
    } else {
      setNotification({ timeDifferenceMessage, userSleepScheduleMessage,  convertedSleepScheduleMessage, availableTimes: ["No common available time found."], availableTimesInOtherPersonTimezone: [] });
    }
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const myTime = moment.tz(myTimezone).format("HH:mm");
    const theirTime = moment.tz(theirTimezone).format("HH:mm");
    const theirOffset = moment.tz.zone(theirTimezone).utcOffset(moment());
    const myOffset = moment.tz.zone(myTimezone).utcOffset(moment());
    const timeDiffInMinutes = theirOffset - myOffset;
    const timeDiffInHours = timeDiffInMinutes / 60;
    const newTimeDifference = <p>The time difference is {timeDiffInHours} hours. <br /> If it&apos;s {myTime} for you, it&apos;ll be {theirTime} for them.</p>

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
                className="text-black p-1 mb-5"
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-14 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      )}
      {showSleepScheduleForm && (
        <SleepScheduleForm onSubmit={handleSleepScheduleSubmit} />
      )}
{notification && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center text-black"
    onClick={closeNotification}
  >
    <div
      className="bg-white p-6 rounded shadow-md text-center w-96"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-2xl font-bold mb-4">Here Are The Results</h2>
      <div className="text-md mb-4">{notification.timeDifferenceMessage}</div>
      <p className="text-md mb-4">{notification.userSleepScheduleMessage}</p>
      <div className="text-md mb-4">{notification.convertedSleepScheduleMessage}</div>
      <div className="bg-gray-300 pb-0 border-2 border-indigo-500/100">
      <h3 className="text-xl font-semibold mt-1">Best Time Range to Talk</h3>
      <p className="text-sm mb-1">Based on when you&apos;re both awake</p>
      <ul className="text-lg mb-1">
        {notification.availableTimes.map((timeRange, index) => (
          <li key={index}>{timeRange}</li>
        ))}
      </ul>
      <p className="mb-2">Or</p>
      <p className="text-sm mb-1">In the other person&apos;s timezone, that&apos;s</p>
      <ul className="text-lg mb-4">
        {notification.availableTimesInOtherPersonTimezone.map((timeRange, index) => (
          <li key={index}>{timeRange}</li>
        ))}
      </ul>
      </div>
      <p className="text-xs mt-2">Note: 1 hour has been subtracted from the total available time to account for the hour before bed where it is advised to limit your device usage</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={closeNotification}
      >
        Close
      </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TimezoneForm;
