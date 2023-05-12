import Header from "@/components/Header";
import HomeButton from "@/components/HomeButton";
import TimezoneForm from "@/components/TimezoneForm";
import Image from "next/image";

const TimezonePage = () => {
  return (
    <div className="flex min-h-fit flex-col justify-between text-center">
      <Header />
        <Image src="/images/earth.png" alt="Background" className="z-10" fill />
      <div className="flex flex-col items-center text-center  p-10 sm:p-16 h-full font-mono z-20">
        <h1 className="text-2xl sm:text-4xl font-bold mb-4">Find the Best Time To Talk</h1>
        <TimezoneForm />
      </div>
    </div>
  );
};

export default TimezonePage;
