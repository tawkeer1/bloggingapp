"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import quotes from "../constants";
import { MdCancel } from "react-icons/md";
import Link from "next/link";

const Quote = () => {
  const [showQuote, setShowQuote] = useState(false);
  const [dailyQuote, setDailyQuote] = useState({});

useEffect(() => {
  const timer = setTimeout(() => {
    setShowQuote(true);
  }, 8000);

  return () => clearTimeout(timer);
}, []);

useEffect(() => {
  const today = new Date();
  const daysSinceEpoch = Math.floor(today.getTime() / 86400000); 

  const index = daysSinceEpoch % quotes.length;
  setDailyQuote(quotes[index]);
}, [quotes]);


  return (
    <div className="flex justify-center items-center">
      <AnimatePresence>
        {showQuote && (
          <motion.div
            initial={{ x: -100, opacity: 0 }} // Start off-screen (left)
            animate={{ x: 0, opacity: 1 }} // Slide in smoothly to center
            exit={{ x: -100, opacity: 0 }} // Slide back & fade out to left
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-lg bg-gray-200 dark:bg-[#2A2A2A] p-4 shadow-lg w-full max-w-xs break-words"
          >
            <div>
            <p className="text-lg font-light text-[#00383c]  dark:text-[#04daea] mb-2">Quote of the day</p>
            {showQuote && (
              <MdCancel
              className="absolute top-5 right-2 text-md text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={() => setShowQuote(false)}
              />
            )}
            {showQuote && dailyQuote && (
              <div>
                <p className="text-lg font-semibold whitespace-normal break-words">
                  {dailyQuote.text}
                </p>
                <p className="text-sm text-right">- {dailyQuote.author}</p>
              </div>
            )}
        </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quote;
