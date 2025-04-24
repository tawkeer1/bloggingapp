import { Footer } from 'flowbite-react'
import React from 'react'
import {
    BsFacebook,
    BsInstagram,
    BsTwitter,
    BsGithub,
    BsDribbble,
    BsLinkedin,
  } from "react-icons/bs";
const page = () => {
  return (
    <div className="min-h-screen dark:bg-gray-800 dark:text-white bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-700 dark:text-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Write to Us</h1>
        
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium ">Name</label>
            <input type="text" id="name" name="name" required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium ">Email</label>
            <input type="email" id="email" name="email" required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium ">Subject</label>
            <input type="text" id="subject" name="subject"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium ">Message</label>
            <textarea id="message" name="message" rows={4} required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
          </div>

          <button type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default page
