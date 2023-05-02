import React, { useState } from "react";

const SleepScheduleForm = ({}) => {
  const [mySleepStart, setMySleepStart] = useState("");
  const [mySleepEnd, setMySleepEnd] = useState("");
  const [theirSleepStart, setTheirSleepStart] = useState("");
  const [theirSleepEnd, setTheirSleepEnd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // save the sleep schedules for later use
    const mySchedule = { sleepStart: mySleepStart, sleepEnd: mySleepEnd };
    const theirSchedule = {
      sleepStart: theirSleepStart,
      sleepEnd: theirSleepEnd,
    };

    // convert the other person's sleep schedule to local timezone
    const theirSleepStartLocal = new Date(
      `1970-01-01T${theirSchedule.sleepStart}`
    );
    const theirSleepEndLocal = new Date(`1970-01-01T${theirSchedule.sleepEnd}`);

    console.log("My sleep schedule:", mySchedule);
    console.log("Their sleep schedule in their timezone:", theirSchedule);
    console.log("Their sleep schedule in my local timezone:", {
      sleepStart: theirSleepStartLocal.toLocaleTimeString(),
      sleepEnd: theirSleepEndLocal.toLocaleTimeString(),
    });
  };

  return (
    <form
      className="flex flex-col items-center justify-center space-y-3 mt-4"
      onSubmit={handleSubmit}
    >
      <div className="flex">
        <label htmlFor="mySleepStart">I sleep from</label>
        <input
          type="time"
          id="mySleepStart"
          value={mySleepStart}
          onChange={(e) => setMySleepStart(e.target.value)}
          className="text-black p-1 mb-3 ml-2 mr-2"
        />
        <div>
          <label htmlFor="mySleepEnd">to</label>
          <input
            type="time"
            id="mySleepEnd"
            value={mySleepEnd}
            onChange={(e) => setMySleepEnd(e.target.value)}
            className="text-black p-1 mb-3 ml-2 mr-2"
          />
        </div>
      </div>
      <div>
        <label htmlFor="theirSleepStart">
          They sleep from (in their timezone)
        </label>
        <input
          type="time"
          id="theirSleepStart"
          value={theirSleepStart}
          onChange={(e) => setTheirSleepStart(e.target.value)}
          className="text-black p-1 mb-3 ml-2 mr-2"
        />
        <label htmlFor="theirSleepEnd">to</label>
        <input
          type="time"
          id="theirSleepEnd"
          value={theirSleepEnd}
          onChange={(e) => setTheirSleepEnd(e.target.value)}
          className="text-black p-1 mb-3 ml-2 mr-2"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-14 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default SleepScheduleForm;
