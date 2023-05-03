import React, { useState } from "react";
import moment from "moment-timezone";

const SleepScheduleForm = ({ onSubmit }) => {
  const [userSleepSchedule, setUserSleepSchedule] = useState(moment().format("HH:mm"));
  const [otherPersonSleepSchedule, setOtherPersonSleepSchedule] = useState(moment().format("HH:mm"));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userSleepSchedule, otherPersonSleepSchedule);
  };

  return (
    <form
      className="flex flex-col items-center justify-center space-y-3 mt-3"
      onSubmit={handleSubmit}
    >
      <label htmlFor="userSleepSchedule">Your Sleep Schedule</label>
      <input
        type="time"
        id="userSleepSchedule"
        value={userSleepSchedule}
        onChange={(e) => setUserSleepSchedule(e.target.value)}
        className="text-black"
      />
      <label htmlFor="otherPersonSleepSchedule">Other Persons Sleep Schedule</label>
      <input
        type="time"
        id="otherPersonSleepSchedule"
        value={otherPersonSleepSchedule}
        onChange={(e) => setOtherPersonSleepSchedule(e.target.value)}
        className="text-black"

      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-14 rounded "
      >
        Submit
      </button>
    </form>
  );
};

export default SleepScheduleForm