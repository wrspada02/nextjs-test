import { BsPerson } from 'react-icons/bs';
import { FiCalendar } from 'react-icons/fi';
import { format } from 'date-fns';
import Link from 'next/link';
import ptBR from 'date-fns/locale/pt-BR';

import { Post } from '../../pages';

export function Cards({
  uid,
  data,
  first_publication_date,
}: Post): JSX.Element {
  return (
    <Link href={`/post/${uid}`}>
      <article>
        <h1>{data.title}</h1>
        <p>{data.subtitle}</p>
        <ul>
          <li>
            <FiCalendar color="#D7D7D7" />
            <span>
              {format(new Date(first_publication_date), 'MM/dd/yyyy', {
                locale: ptBR,
              })}
            </span>
          </li>
          <li>
            <BsPerson color="#D7D7D7" />
            <span>{data.author}</span>
          </li>
        </ul>
      </article>
    </Link>
  );
}
