import Header from "@/components/Header";
import SleepScheduleForm from "@/components/SleepScheduleForm";
import Image from "next/image";

const sleepSchedule = () => {
    return (
        <div className="flex min-h-fit flex-col items-center text-center justify-between">
            <Image src="/images/earth.png" alt="Background" fill />
          <Header />
          <div className="flex flex-col items-center mt-16 sm:mt-32 p-16 h-full font-mono z-10">
            <h1 className="text-4xl font-bold mb-4">Tell us Your Sleep Schedules</h1>
            <p className="mb-3">This will help us calculate the best times for you and your contact to communicate</p>
            <SleepScheduleForm />
          </div>
        </div>
      );
    };
export default sleepSchedule