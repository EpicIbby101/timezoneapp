import React, { useState } from "react";
import moment from "moment-timezone";

const SleepScheduleForm = ({ onSubmit }) => {
  const [userSleepTime, setUserSleepTime] = useState(moment().format("HH:mm"));
  const [userWakeTime, setUserWakeTime] = useState(moment().format("HH:mm"));
  const [otherPersonSleepTime, setOtherPersonSleepTime] = useState(
    moment().format("HH:mm")
  );
  const [otherPersonWakeTime, setOtherPersonWakeTime] = useState(
    moment().format("HH:mm")
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(
      userSleepTime,
      userWakeTime,
      otherPersonSleepTime,
      otherPersonWakeTime
    );
  };
  return (
    <div>
      <p className="mb-3">
        Now input your sleep schedule and the sleep schedule of the other person
      </p>
      <form
        className="flex flex-col items-center justify-center space-y-3 mt-3"
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label htmlFor="userSleepTime">I sleep from </label>
          <input
            type="time"
            id="userSleepTime"
            value={userSleepTime}
            onChange={(e) => setUserSleepTime(e.target.value)}
            className="text-black"
          />
          <label htmlFor="userWakeTime"> To </label>
          <input
            type="time"
            id="userWakeTime"
            value={userWakeTime}
            onChange={(e) => setUserWakeTime(e.target.value)}
            className="text-black"
          />
        </div>
        <div>
          <label htmlFor="otherPersonSleepTime">They sleep from </label>
          <input
            type="time"
            id="otherPersonSleepTime"
            value={otherPersonSleepTime}
            onChange={(e) => setOtherPersonSleepTime(e.target.value)}
            className="text-black"
          />
          <label htmlFor="otherPersonWakeTime"> To </label>
          <input
            type="time"
            id="otherPersonWakeTime"
            value={otherPersonWakeTime}
            onChange={(e) => setOtherPersonWakeTime(e.target.value)}
            className="text-black"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-14 rounded "
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SleepScheduleForm;
