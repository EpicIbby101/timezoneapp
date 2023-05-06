import Image from "next/image";
import Link from "next/link";

export default function Header() {
return(
    <div className="z-20 w-full items-center justify-center font-mono text-sm ">
    <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-6 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30">
      Created by: Kevin Grittner | Check my portfolio here: <a href="https://www.kevingrittner.com" target="_blank" className='text-blue-600 ml-1'>www.kevingrittner.com</a>
    </p>
    <Link href="/">
    <Image src="/images/home-button-icon.png" alt="home" width={50} height={50} className="mt-24 lg:mt-3 sm:mt-20 ml-4" />
    </Link>
    </div>
)
}