import Link from "next/link";

export default function About() {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='max-w-2xl mx-auto p-3 text-center'>
          <div>
            <h1 className='text-3xl font font-semibold text-center my-7'>
              About Tawkeer&apos;s Blog
            </h1>
            <div className='text-md text-gray-500 flex flex-col gap-6'>
              <p>
              Hi, I&apos;m Tawkeer Ahmad, the creator of this blog. I started this space to share my thoughts, experiences, and insights on topics that interest me. Whether it&apos;s technology, personal development, or anything in between, I aim to provide valuable and engaging content for my readers.
<br />
I have a strong background in C++, Java, JavaScript, Python, and web development, with a particular focus on React and Next.js. Through this blog, I hope to document my journey, share useful tips, and connect with like-minded individuals.
<br />
Feel free to explore, leave comments, and join the conversation. Let&apos;s learn and grow together!
<br />
Stay Connected:
<Link  href="mailto:towqeerahmad111@gmail.com" className="ml-5 font-semibold hover:text-white">
    Email me
</Link>
</p>
              <p>
                This website is created using Next.js and{' '}
                <a
                  href='https://go.clerk.com/fgJHKlt'
                  target='_blank'
                  className='text-teal-500 hover:underline'
                >
                  Clerk
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }