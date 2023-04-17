import Header from "@/components/Header";
import TimezoneForm from "@/components/TimezoneForm";
import Image from "next/image";

const TimezonePage = () => {
  return (
    <div className="flex min-h-fit flex-col items-center text-center justify-between">
        <Image src="/images/earth.png" alt="Background" fill />
      <Header />
      <div className="flex flex-col items-center mt-16 sm:mt-32 p-16 h-full font-mono z-10">
        <h1 className="text-4xl font-bold mb-4">Find the Best Time To Talk</h1>
        <p className="mb-3">Please select your timezone and the timezone of the person you wish to talk to</p>
        <TimezoneForm />
      </div>
    </div>
  );
};

export default TimezonePage;
