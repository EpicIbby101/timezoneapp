import React, { useState } from "react";
import moment from "moment-timezone";

const TimezoneForm = () => {
  const [myTimezone, setMyTimezone] = useState(
    moment.tz.guess() || moment.tz.names()[0]
  );
  const [theirTimezone, setTheirTimezone] = useState(moment.tz.names()[0]);
  const [timeDifference, setTimeDifference] = useState("");
  const [selectedTimezones, setSelectedTimezones] = useState({
    myTimezone,
    theirTimezone,
    timeDifference
  });

  const timezones = moment.tz.names();

  const handleSubmit = (e) => {
    e.preventDefault();
    const myTime = moment.tz(myTimezone).format("h:mm A");
    const theirTime = moment.tz(theirTimezone).format("h:mm A");
    const theirOffset = moment.tz.zone(theirTimezone).utcOffset(moment());
    const myOffset = moment.tz.zone(myTimezone).utcOffset(moment());
    const timeDiffInMinutes = theirOffset - myOffset;
    const timeDiffInHours = timeDiffInMinutes / 60;
    const newTimeDifference = `The time difference is ${timeDiffInHours} hours. If it's ${myTime} for you, it'll be ${theirTime} for them.`;
  
    setSelectedTimezones({ myTimezone, theirTimezone, timeDifference: newTimeDifference });
    setTimeDifference(newTimeDifference);
  };

  return (
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
            <option key={timezone} value={timezone} className="text-black">
              {timezone}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-14 rounded "
      >
        Next 👉
      </button>
      <div className="text-center">{timeDifference}</div>
    </form>
  );
};

export default TimezoneForm;
