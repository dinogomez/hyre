"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";

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

  const headerClasses = `text-gray-600 sticky top-0${
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
        <div className="flex space-x-12 items-center text-white">
          <Link href="/signin">
            <h1 className="hover:underline decoration-4 underline-offset-8 font-bold hover:decoration-purple-600">
              Sign In
            </h1>
          </Link>

          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="secondary" className="font-bold">
                Get Started
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
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <div className="grid gap-4 py-4 space-y-3">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      id="firstName"
                      className="w-full px-3 py-2 border"
                      placeholder="First Name"
                      type="text"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      id="lastName"
                      className="w-full px-3 py-2 border"
                      placeholder="Last Name"
                      type="text"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      id="email"
                      className="w-full px-3 py-2 border"
                      placeholder="Email"
                      type="email"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      id="password"
                      className="w-full px-3 py-2 border"
                      placeholder="Password"
                      type="password"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      id="cpassword"
                      className="w-full px-3 py-2 border"
                      placeholder="Confirm Password"
                      type="password"
                    />
                  </div>
                </div>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Skills</Label>
                <Input type="email" id="email" placeholder="Email" />
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}

export default Header;
