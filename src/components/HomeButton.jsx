import Image from "next/image";
import Link from "next/link";

export default function HomeButton() {
    return (
        <div className="z-40 mt-2"> 
             <Link href="/">
          <Image
            src="/images/home-button-icon.png"
            alt="home"
            width="50"
            height="50"
          />
  </Link>
        </div>
    )
}