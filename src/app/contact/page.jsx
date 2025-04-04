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
    <div className='flex justify-center items-center min-h-screen'>
      <Footer
            container
            className="border border-t-8 border-gray-600 dark:bg-[#1F1F1F]"
          >
            <div className="w-full max-w-7xl mx-auto">
              <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                  <div>
                    <Footer.Title title="About" />
                    <Footer.LinkGroup col>
                      <Footer.Link
                        href="https://portfolio-nine-livid-49.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Portfolio
                      </Footer.Link>
                      <Footer.Link
                        href="/about"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Tawkeer&apos;s Blog
                      </Footer.Link>
                    </Footer.LinkGroup>
                  </div>
                  <div>
                    <Footer.Title title="Follow us" />
                    <Footer.LinkGroup col>
                      <Footer.Link
                        href="https://github.com/tawkeer1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Github
                      </Footer.Link>
                    </Footer.LinkGroup>
                  </div>
                  <div>
                    <Footer.Title title="Legal" />
                    <Footer.LinkGroup col>
                      <Footer.Link href="#">Privacy Policy</Footer.Link>
                      <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
                    </Footer.LinkGroup>
                  </div>
                </div>
              </div>
              <Footer.Divider />
              <div className="w-full sm:flex sm:items-center sm:justify-between">
                <Footer.Copyright
                  href="#"
                  by="Tawkeer's blog"
                  year={new Date().getFullYear()}
                />
                <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                  <Footer.Icon
                    href="https://www.facebook.com/profile.php?id=100086531005168"
                    icon={BsFacebook}
                  />
                  <Footer.Icon
                    href="http://instagram.com/towqeer_ahmad/"
                    icon={BsInstagram}
                  />
                  <Footer.Icon href="https://github.com/tawkeer1" icon={BsGithub} />
                  <Footer.Icon href="https://www.linkedin.com/in/tawkeer-ahmad-14079229a/" icon={BsLinkedin} />
                </div>
              </div>
            </div>
          </Footer>
    </div>
  )
}

export default page
