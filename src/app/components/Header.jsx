"use client";
import { Button, Navbar, TextInput } from "flowbite-react";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { dark, light } from "@clerk/themes";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { FaHome } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { GoProjectRoadmap } from "react-icons/go";
export default function Header() {
  const path = usePathname();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(searchParams);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    router.push(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [searchParams]);
  return (
    <Navbar className="border-b-2">
      <Link
        href="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <div className="max-w-[70px] ml-10">
          <Image
            src="/logo2.webp"
            width={70}
            height={70}
            alt="logo"
            className="px-2 py-1 rounded-[50%]"
          ></Image>
        </div>
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button
        href="/search"
        className="w-8 h-8  mt-1 sm:mt-0 sm:w-12 sm:h-10 lg:hidden flex justify-center items-center handle-small"
        color="gray"
        pill
      >
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2 ">
        <Button
          className="w-8 h-8 mt-1.5 sm:mt-0 sm:w-12 sm:h-10 sm:inline flex justify-center items-center handle-small"
          color="gray"
          pill
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>
        <SignedIn>
          <UserButton
            appearance={{
              baseTheme: theme === "light" ? light : dark,
            }}
            userProfileUrl="/dashboard?tab=profile"
          />
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in">
            <Button
              className="bg-gradient-to-r from-gray-300 to-gray-500 text-gray-900 border-gray-500"
              outline
            >
              Sign In
            </Button>
          </Link>
        </SignedOut>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link href="/">
          <Navbar.Link
            active={path === "/"}
            className={`flex items-center ${
              path === "/" ? "dark:text-gray-200 bg-transparent" : ""
            }`}
            as="div"
          >
            <FaHome className="mr-2" />
            Home
          </Navbar.Link>
        </Link>
        <Link href="/about">
          <Navbar.Link
            active={path === "/about"}
            as={"div"}
            className="flex items-center border-none outline-none"
          >
            <CiUser className="mr-2" />
            About
          </Navbar.Link>
        </Link>
        <Link href="/projects">
          <Navbar.Link
            active={path === "/projects"}
            as={"div"}
            className="flex items-center border-none outline-none"
          >
            <GoProjectRoadmap className="mr-2 " />
            Projects
          </Navbar.Link>
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
