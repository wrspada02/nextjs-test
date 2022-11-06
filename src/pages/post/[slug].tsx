import { GetStaticPaths, GetStaticProps } from 'next';
import { BsPerson } from 'react-icons/bs';
import { MdOutlineWatchLater } from 'react-icons/md';
import { FiCalendar } from 'react-icons/fi';
import { format } from 'date-fns';
import { RichText } from 'prismic-dom';
import ptBR from 'date-fns/locale/pt-BR';

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
  return post.first_publication_date ? (
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
              <span>4min</span>
            </li>
          </ul>
        </section>
        <section>
          {post.data.content.map(mainContent => (
            <article className={styles.space}>
              <h2>{mainContent.heading}</h2>
              <p>{mainContent.body.map(item => item.text)}</p>
            </article>
          ))}
        </section>
      </main>
    </section>
  ) : (
    <>Carregando...</>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});
  // const posts = await prismic.getByType();

  return {
    paths: [
      {
        params: {
          slug: 'em-poucas-palavras-e-seguindo-a-definicao-delespythone',
        },
      },
      {
        params: {
          slug: 'um-conjunto-de-ferramentas-javascript-que-adicionou',
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
