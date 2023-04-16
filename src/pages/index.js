import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="flex min-h-fit flex-col items-center justify-between">
      <Image src="/images/earth.png" alt="Background" fill />
      <Header />
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col items-center mt-16 sm:mt-32 p-16 h-full">
          <h1 className="text-4xl font-bold mb-4">
            🌙 Welcome to <span>-Title WIP-</span> 🌙
          </h1>
          <p className="text-xl mb-8 text-center">
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
