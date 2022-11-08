import { GetStaticPaths, GetStaticProps } from 'next';
import { BsPerson } from 'react-icons/bs';
import { MdOutlineWatchLater } from 'react-icons/md';
import { FiCalendar } from 'react-icons/fi';
import { format } from 'date-fns';
import { RichText } from 'prismic-dom';
import ptBR from 'date-fns/locale/pt-BR';

import { useRouter } from 'next/router';
import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  const router = useRouter();

  function handleCalcReadTime(): number {
    const wordsPerMinute = 200;
    let totalWordsContent = 0;

    post.data.content.forEach(content => {
      const paragrapherContent = RichText.asText(content.body);
      const arrayParagrapher = paragrapherContent.split(' ');

      totalWordsContent += arrayParagrapher.length;
    });

    return totalWordsContent / wordsPerMinute;
  }

  return router.isFallback ? (
    <h3>Carregando...</h3>
  ) : (
    <section className={styles.container}>
      <Header />
      <img src={post.data.banner.url} alt="logo-content" />
      <main>
        <section>
          <h1>{post.data.title}</h1>
          <ul>
            <li>
              <FiCalendar color="#D7D7D7" />
              <span>
                {format(new Date(post.first_publication_date), 'PP', {
                  locale: ptBR,
                })}
              </span>
            </li>
            <li>
              <BsPerson color="#D7D7D7" />
              <span>{post.data.author}</span>
            </li>
            <li>
              <MdOutlineWatchLater color="#D7D7D7" />
              <span>{handleCalcReadTime().toFixed(0)}min</span>
            </li>
          </ul>
        </section>
        <section>
          {post.data.content.map((mainContent, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <article className={styles.space} key={index}>
              <h2 key={mainContent.heading.length}>{mainContent.heading}</h2>
              <p key={mainContent.body.length}>
                {mainContent.body.map(item => item.text)}
              </p>
            </article>
          ))}
        </section>
      </main>
    </section>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});
  const posts = await prismic.getByType('posts');

  return {
    paths: [
      {
        params: {
          slug: 'como-utilizar-hooks',
        },
      },
      {
        params: {
          slug: 'criando-um-app-cra-do-zero',
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const prismic = getPrismicClient({ req: params });
  const response = await prismic.getByUID('posts', String(slug), {});

  return {
    props: {
      post: response,
    },
  };
};
