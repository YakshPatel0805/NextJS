import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
    return(
        <header>
            <nav>
                <Link href="/" className='logo'>
                    <Image src="/icons/logo.png" alt='logo' width={50} height={50} />
                    <p>DevEvent</p>
                </Link>

                <ul>
                    <Link href="/">Home</Link>
                    <Link href="/users">My Bookings</Link>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;
