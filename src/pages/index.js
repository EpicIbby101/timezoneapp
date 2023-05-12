import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="flex min-h-fit flex-col items-center justify-between text-center">
      <Image src="/images/earth.png" alt="Background" className="z-10" fill />
      <Header />
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col items-center p-10 sm:p-16 h-full">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">
            Welcome to Timezone Buddy
          </h1>
          <p className="text-sm sm:text-lg mb-8 text-center">
            This app is designed to calculate the best time for two people from
            different timezones to call or talk to each other without disrupting
            their circadian rhythm and sleep patterns. <br />
            <br />🔻 Get started by clicking the button below 🔻
          </p>
          {
            <Link
              href="/timezone"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded"
            >
              Get Started
            </Link>
          }
        </div>
      </div>
    </main>
  );
}
