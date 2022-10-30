import Link from 'next/link';
import styles from './header.module.scss';

export default function Header(): JSX.Element {
  return (
    <header className={styles.container}>
      <Link href="/">
        <img src="/logo.png" alt="logo" />
      </Link>
    </header>
  );
}
