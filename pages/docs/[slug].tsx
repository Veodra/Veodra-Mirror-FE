import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import fs from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import DefaultLayout from '@/layouts/default';
import { Link } from '@heroui/link';

interface DocPageProps {
  mdxSource: MDXRemoteSerializeResult;
  docFiles: { slug: string; title: string }[]; // Array to hold file info
}

const DocPage: React.FC<DocPageProps> = ({ mdxSource, docFiles }) => {
  const router = useRouter();
  const { slug } = router.query;
  const t = useTranslations("Docs");

  return (
    <DefaultLayout>
    <div style={{ display: 'flex'}}>
      <aside style={{ width: '300px', borderRight: '1px solid #ccc', padding: '3px' }}>
        <h3 className='text-lg font-bold'>{t("docList")}</h3>
        <ul className='list-disc list-inside'>
          {docFiles.map(file => (
            <li key={file.slug}>
              <Link href={file.slug} color='foreground'>
                  {file.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main style={{ flex: 1, padding: '20px' }} className='markdown-body'>
        <MDXRemote {...mdxSource} />
      </main>
    </div>
    </DefaultLayout>
  );
};

export async function getStaticPaths() {
    const paths: { params: { slug: string }; locale: string }[] = [];
    const locales = ['zh', 'en']; // 支持的语言列表
  
    locales.forEach((locale) => {
      const docsDirectory = path.join(process.cwd(), 'docs', locale);
      try {
        const filenames = fs.readdirSync(docsDirectory);
        filenames.forEach((filename) => {
          if (filename.endsWith('.mdx')) {
            const slug = filename.replace('.mdx', '');
            paths.push({
              params: { slug },
              locale,
            });
          }
        });
      } catch (error) {
        console.error(`Error reading directory for locale ${locale}:`, error);
      }
    });
  
    return {
      paths,
      fallback: false,
    };
  }

export async function getStaticProps({ params, locale }: { params: { slug: string }; locale: string }) {
  const docsDirectory = path.join(process.cwd(), 'docs', locale);
  const filePath = path.join(docsDirectory, `${params.slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');

  const mdxSource = await serialize(fileContents);

  const docFiles = fs.readdirSync(docsDirectory)
  .filter(file => file.endsWith('.mdx'))
  .map(file => {
    const fileContent = fs.readFileSync(path.join(docsDirectory, file), 'utf8');
    const firstLine = fileContent.split('\n')[0].trim();
    const title = firstLine.replace(/^#+ /, '');
    return {
      slug: file.replace('.mdx', ''),
      title: title,
    };
  });

  return {
    props: {
      mdxSource,
      docFiles,
      messages: (await import(`../../intl/${locale}.json`)).default,
    },
  };
}

export default DocPage;