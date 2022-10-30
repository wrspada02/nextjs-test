import Image from 'next/image';
import Logo from '../../public/logo.png';

export default function Header(): JSX.Element {
  return (
    <header>
      <Image src={Logo} alt="logo" width={30} height={30} />
    </header>
  );
}
