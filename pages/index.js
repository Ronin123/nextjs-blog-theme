import Link from 'next/link';
import { getPosts } from '../utils/mdx-utils-posts';
import { getPoems } from '../utils/mdx-utils-poems';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

export default function Index({ posts, poems, globalData }) {
  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      <main className="w-full">
        <h1 className="text-3xl lg:text-3xl text-center mb-12">
          {globalData.blogTitle}
        </h1>
        <div className="w-full flex ">
        <ul className="w-full p-3">
        <li className="text-3xl lg:text-3xl text-center mb-12">
          Blogs
        </li>
          {posts.map((post) => (
            <li
              key={post.filePath}
              className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
            >
              <Link
                as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                href={`/posts/[slug]`}
              >
                <a className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                  {post.data.date && (
                    <p className="uppercase mb-3 font-bold opacity-60">
                      {post.data.date}
                    </p>
                  )}
                  <h2 className="text-2xl md:text-3xl">{post.data.title}</h2>
                  {post.data.description && (
                    <p className="mt-3 text-lg opacity-60">
                      {post.data.description}
                    </p>
                  )}
                  <ArrowIcon className="mt-4" />
                </a>
              </Link>
            </li>
          ))}
        </ul>

        {/* start a1s */}
        <ul className="w-full p-3">
           <li className="text-3xl lg:text-3xl text-center mb-12">
              Poems
             </li>
             {poems.map((poem) => (
               <li
                 key={poem.filePath}
                 className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
               >
                 <Link
                   as={`/poems/${poem.filePath.replace(/\.mdx?$/, '')}`}
                   href={`/poems/[slug]`}
                 >
                   <a className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                     {poem.data.date && (
                       <p className="uppercase mb-3 font-bold opacity-60">
                         {poem.data.date}
                       </p>
                     )}
                     <h2 className="text-2xl md:text-3xl">{poem.data.title}</h2>
                     {poem.data.description && (
                       <p className="mt-3 text-lg opacity-60">
                         {poem.data.description}
                       </p>
                     )}
                     <ArrowIcon className="mt-4" />
                   </a>
                 </Link>
               </li>
             ))}
           </ul>
           <ul className="w-full p-3">
        <li className="text-3xl lg:text-3xl text-center mb-12">
          Art
        </li>
             {posts.map((post) => (
               <li
                 key={post.filePath}
                 className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
               >
                 <Link
                   as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                   href={`/posts/[slug]`}
                 >
            

                   <a className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                     {post.data.date && (
                       <p className="uppercase mb-3 font-bold opacity-60">
                         {post.data.date}
                       </p>
                     )}
                     <h2 className="text-2xl md:text-3xl">{post.data.title}</h2>
                     {post.data.description && (
                       <p className="mt-3 text-lg opacity-60">
                          <img src={post.data.title1} />
                        </p>
                     )}
                     <ArrowIcon className="mt-4" />
                   </a>
                 </Link>
               </li>
             ))}
           </ul>
           </div> 
        {/* end a1s */}
      </main>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />

</Layout>

  );
}

export function getStaticProps() {
  const posts = getPosts();
  const poems = getPoems();

  const globalData = getGlobalData();

  return { props: { posts, poems, globalData } };
}

