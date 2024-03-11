"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClasses = `text-gray-600 sticky top-0 z-50 ${
    isScrolled ? "border-b border-neutral-800 bg-neutral-900" : ""
  }`;

  return (
    <header className={headerClasses}>
      <div className="container md:justify-between flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          href="/"
          className="flex title-font font-medium items-center  mb-4 md:mb-0"
        >
          <Image
            src="/horizon.webp"
            alt="horizon-logo"
            width={150}
            height={150}
          ></Image>
        </Link>
        {/* <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-gray-900">First Link</a>
          <a className="mr-5 hover:text-gray-900">Second Link</a>
          <a className="mr-5 hover:text-gray-900">Third Link</a>
          <a className="mr-5 hover:text-gray-900">Fourth Link</a>
        </nav> */}

        <Button size="xs" className="z-50 text-xs">
          Login
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </Button>
      </div>
    </header>
  );
}

export default Header;
