"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import quotes from "../constants";
import { MdCancel } from "react-icons/md";
import Link from "next/link";

const Quote = () => {
  const [showQuote, setShowQuote] = useState(false);
  const [randomQuote, setRandomQuote] = useState({});
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowQuote(true);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setRandomQuote(randomQuote);
  }, []);
  return (
    <div className="flex justify-center items-center">
      <AnimatePresence>
        {showQuote && (
          <motion.div
            initial={{ x: -100, opacity: 0 }} // Start off-screen (left)
            animate={{ x: 0, opacity: 1 }} // Slide in smoothly to center
            exit={{ x: -100, opacity: 0 }} // Slide back & fade out to left
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-lg bg-gray-200 dark:bg-gray-800 p-4 shadow-lg w-full max-w-xs break-words"
          >
            {showQuote && (
              <MdCancel
                className="absolute top-5 right-2 text-md text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={() => setShowQuote(false)}
              />
            )}
            {showQuote && randomQuote && (
              <div>
                <p className="text-lg font-semibold whitespace-normal break-words">
                  {randomQuote.text}
                </p>
                <p className="text-sm text-right">- {randomQuote.author}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quote;
