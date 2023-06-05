import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypePrism from '@mapbox/rehype-prism';
import remarkGfm from 'remark-gfm';

// POEMS_PATH is useful when you want to get the path to a specific file
export const POEMS_PATH = path.join(process.cwd(), 'poems');

// poemFilePaths is the list of all mdx files inside the POEMS_PATH directory
export const poemFilePaths = fs
  .readdirSync(POEMS_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));

export const sortPoemsByDate = (poems) => {
  return poems.sort((a, b) => {
    const aDate = new Date(a.data.date);
    const bDate = new Date(b.data.date);
    return bDate - aDate;
  });
};

export const getPoems = () => {
  let poems = poemFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POEMS_PATH, filePath));
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  poems = sortPoemsByDate(poems);

  return poems;
};

export const getPoemBySlug = async (slug) => {
  const poemFilePath = path.join(POEMS_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(poemFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypePrism],
    },
    scope: data,
  });

  return { mdxSource, data, poemFilePath };
};

export const getNextPoemBySlug = (slug) => {
  const poems = getPoems();
  const currentFileName = `${slug}.mdx`;
  const currentPoem = poems.find((poem) => poem.filePath === currentFileName);
  const currentPoemIndex = poems.indexOf(currentPoem);

  const poem = poems[currentPoemIndex - 1];
  // no prev poem found
  if (!poem) return null;

  const nextPoemSlug = poem?.filePath.replace(/\.mdx?$/, '');

  return {
    title: poem.data.title,
    slug: nextPoemSlug,
  };
};

export const getPreviousPoemBySlug = (slug) => {
  const poems = getPoems();
  const currentFileName = `${slug}.mdx`;
  const currentPoem = poems.find((poem) => poem.filePath === currentFileName);
  const currentPoemIndex = poems.indexOf(currentPoem);

  const poem = poems[currentPoemIndex + 1];
  // no prev poem found
  if (!poem) return null;

  const previousPoemSlug = poem?.filePath.replace(/\.mdx?$/, '');

  return {
    title: poem.data.title,
    slug: previousPoemSlug,
  };
};
