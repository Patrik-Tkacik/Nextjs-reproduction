import { type ImageProps } from 'next/image'
import glob from 'fast-glob'

async function loadEntries<T extends { date: string }>(
  directory: string,
  metaName: string,
): Promise<Array<MDXEntry<T>>> {
  // console.log('Directory:::', directory);
  // console.log('MetaName:::', metaName);

  const mdxFiles = await glob('**/*.mdx', { cwd: `src/app/[locale]/${directory}` });
  // console.log(`Found ${mdxFiles.length} MDX files`);
  // console.log('mdxFiles log:', mdxFiles) 

  const entries = await Promise.all(mdxFiles.map(async (filename) => {
    // console.log(`Processing file: ${filename}`);
    let metadata = (await import(`../app/[locale]/${directory}/${filename}`))[metaName] as T;
    // console.log(`Extracted metadata:`, metadata);

    return {
     ...metadata,
      metadata,
      href: `/${directory}/${filename.replace(/\/page\.mdx$/, '')}`,
    };
  }));

  // console.log('Sorting entries by date');
  const sortedEntries = entries.sort((a, b) => b.date.localeCompare(a.date));
  // console.log('Sorted entries:', sortedEntries);

  return sortedEntries;
}


type ImagePropsWithOptionalAlt = Omit<ImageProps, 'alt'> & { alt?: string }

export type MDXEntry<T> = T & { href: string; metadata: T }

export interface Article {
  date: string
  title: string
  description: string
  author: {
    name: string
    role: string
    image: ImagePropsWithOptionalAlt
  }
}

export interface CaseStudy {
  date: string
  client: string
  title: string
  description: string
  summary: Array<string>
  logo: ImageProps['src']
  image: ImagePropsWithOptionalAlt
  service: string
  testimonial: {
    author: {
      name: string
      role: string
    }
    content: string
  }
}

export function loadArticles() {
  return loadEntries<Article>('blog', 'article')
}

export function loadCaseStudies() {
  return loadEntries<CaseStudy>('work', 'caseStudy')
}