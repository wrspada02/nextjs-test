import { GetStaticProps } from 'next';
import ptBR from 'date-fns/locale/pt-BR';
import { format } from 'date-fns';
import { getPrismicClient } from '../services/prismic';

import Header from '../components/Header';
import { Cards } from '../components/Cards';

import styles from './home.module.scss';
import commonStyles from '../styles/common.module.scss';

export interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  return (
    <main className={`${commonStyles.all} ${styles.main}`}>
      <Header />
      {postsPagination.results.map(post => (
        <Cards
          data={post.data}
          first_publication_date={post.first_publication_date}
          uid={post.uid}
          key={post.uid}
        />
      ))}
    </main>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prismic = getPrismicClient({ req: params });
  const postsResponse = await prismic.getByType('posts', {
    fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
  });

  return {
    props: {
      postsPagination: postsResponse,
    },
  };
};
