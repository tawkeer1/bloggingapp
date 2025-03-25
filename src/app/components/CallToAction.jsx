import { Button } from "flowbite-react";
export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center rounded-sm items-center text-center">
      <div className="flex-1 justify-center flex flex-col mr-2">
        <h2 className="text-2xl">
          If you are interested in learning more about my work and projects
        </h2>
        <p className="text-gray-500 my-2">Checkout my portfolio</p>
        <Button className="rounded-tl-xl rounded-bl-none px-2 py-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-lg text-white">
          <a
            href="https://portfolio-nine-livid-49.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            My Portfolio
          </a>
        </Button>
      </div>
      <div className="mt-2 md:mt-0 max-w-[200px] ">
        <img
          className="rounded-lg outline-none w-full"
          src="/Portfolio.jpg"
        />
      </div>
    </div>
  );
}
