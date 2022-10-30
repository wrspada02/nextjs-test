import Link from 'next/link';
import styles from './header.module.scss';
import common from '../../styles/common.module.scss';

export default function Header(): JSX.Element {
  return (
    <header className={`${styles.container} ${common.all}`}>
      <Link href="/">
        <img src="/logo.png" alt="logo" />
      </Link>
    </header>
  );
}
