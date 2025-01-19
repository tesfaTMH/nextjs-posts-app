import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between w-[70%] h-20 my-3 mx-auto">
      <Link href="/">
        <Image
          src={logo}
          alt="Mobile phone with posts feed on it"
          width={80}
          height={80}
          className="p-2 rounded-full bg-[#363234] hover:bg-white transition-all ease-in-out"
          priority
        />
      </Link>
      <nav>
        <ul className="flex items-center justify-center gap-6 ">
          <li className="text-2xl px-3 py-2 rounded-xl bg-[#e32195] hover:bg-[#e32195]/10">
            <Link href="/feed">Feed</Link>
          </li>
          <li className="text-2xl px-3 py-2 rounded-xl bg-[#e32195] hover:bg-[#e32195]/10">
            <Link className="cta-link" href="/new-post">
              New Post
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
