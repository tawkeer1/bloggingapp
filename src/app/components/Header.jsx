"use client";
import { Button, Navbar, TextInput } from "flowbite-react";
import Link from "next/link";
import { FaSearch, FaMoon, FaSun, FaHome, FaBars } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { dark, light } from "@clerk/themes";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { CiUser } from "react-icons/ci";
import { GoProjectRoadmap } from "react-icons/go";

export default function Header() {
  const path = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    setMounted(true);
  }, []);

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
    <Navbar
      fluid
      rounded
      className="border-b-2 sticky top-0 z-50 bg-white dark:bg-[#1F1F1F] shadow-sm px-2 sm:px-4"
    >
      {/* Logo - Left Side */}
      <Link href="/" className="flex-shrink-0 mr-2 sm:mr-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14">
          <Image
            src="/logo2.webp"
            width={56}
            height={56}
            alt="TAWKEER logo"
            className="rounded-[50%] object-cover w-full h-full"
            priority
          />
        </div>
      </Link>

      {/* Desktop Navigation Links - Visible on md and above */}
      <div className="hidden md:flex items-center space-x-1 lg:space-x-3 mx-2 lg:mx-4">
        <Link href="/">
          <div
            className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
              path === "/"
                ? "text-blue-600 dark:text-blue-400 font-medium"
                : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            }`}
          >
            <FaHome className="mr-2" />
            <span className="text-sm lg:text-base">Home</span>
          </div>
        </Link>
        <Link href="/about">
          <div
            className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
              path === "/about"
                ? "text-blue-600 dark:text-blue-400 font-medium"
                : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            }`}
          >
            <CiUser className="mr-2" />
            <span className="text-sm lg:text-base">About</span>
          </div>
        </Link>
        <Link href="/projects">
          <div
            className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
              path === "/projects"
                ? "text-blue-600 dark:text-blue-400 font-medium"
                : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            }`}
          >
            <GoProjectRoadmap className="mr-2" />
            <span className="text-sm lg:text-base">Projects</span>
          </div>
        </Link>
      </div>

      {/* Search Bar - Desktop */}
      <form
        onSubmit={handleSubmit}
        className="hidden lg:inline ml-2 mr-2 flex-1 max-w-sm"
      >
        <TextInput
          type="text"
          placeholder="Search..."
          className="focus:ring-0 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      {/* Right Side Actions */}
      <div className="flex items-center gap-1 sm:gap-2 ml-auto">
        {/* Mobile Search Button */}
        <Button
          href="/search"
          className={`w-10 h-10 lg:hidden flex justify-center items-center p-0 min-w-0 
            ${
              theme === "light"
                ? "bg-gray-500 text-gray-600 hover:bg-gray-400 border border-gray-200"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700"
            }`}
          color="gray"
          pill
        >
          <FaSearch />
        </Button>

        {mounted && (
          <Button
            className={`w-10 h-10 flex justify-center items-center p-0 min-w-0 ${
              theme === "light"
                ? "bg-gray-500 text-gray-600 hover:bg-gray-400 border border-gray-200"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700"
            }`}
            pill
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <FaSun /> : <FaMoon />}
          </Button>
        )}

        {/* User/Sign In Button */}
        <div className="ml-1">
          <SignedIn>
            <UserButton
              appearance={{
                baseTheme: theme === "dark" ? dark : light,
                variables: {
                  colorPrimary: theme === "dark" ? "#FFFFFF" : "#000000",
                },
              }}
              userProfileUrl="/dashboard?tab=profile"
            />
          </SignedIn>

          <SignedOut>
            <Link href="/sign-in">
              <Button className="bg-gradient-to-r from-gray-300 to-gray-500 text-gray-900 hover:from-gray-400 hover:to-gray-600 dark:from-gray-600 dark:to-gray-800 dark:text-white px-3 sm:px-4 text-sm">
                Sign In
              </Button>
            </Link>
          </SignedOut>
        </div>

        {/* Mobile Hamburger Menu - Custom toggle without screen reader text */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 ml-1"
          onClick={() => {
            const navbar = document.querySelector(
              '[data-testid="flowbite-navbar-collapse"]',
            );
            if (navbar) {
              const isExpanded =
                navbar.getAttribute("data-expanded") === "true";
              navbar.setAttribute("data-expanded", (!isExpanded).toString());
              navbar.classList.toggle("hidden");
            }
          }}
          aria-label="Toggle menu"
        >
          <FaBars className="text-gray-700 dark:text-gray-300 text-xl" />
        </button>
      </div>

      {/* Mobile Navigation Collapse */}
      <div
        data-testid="flowbite-navbar-collapse"
        className="md:hidden hidden absolute top-full left-0 right-0 bg-white dark:bg-[#1F1F1F] border-b border-gray-200 dark:border-gray-800 shadow-lg"
        data-expanded="false"
      >
        <div className="px-4 py-3">
          <Link href="/">
            <div
              className={`flex items-center py-3 px-4 rounded-lg mb-1 ${
                path === "/"
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <FaHome className="mr-3" />
              <span className="font-medium">Home</span>
            </div>
          </Link>
          <Link href="/about">
            <div
              className={`flex items-center py-3 px-4 rounded-lg mb-1 ${
                path === "/about"
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <CiUser className="mr-3" />
              <span className="font-medium">About</span>
            </div>
          </Link>
          <Link href="/projects">
            <div
              className={`flex items-center py-3 px-4 rounded-lg mb-1 ${
                path === "/projects"
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <GoProjectRoadmap className="mr-3" />
              <span className="font-medium">Projects</span>
            </div>
          </Link>
        </div>
      </div>
    </Navbar>
  );
}
