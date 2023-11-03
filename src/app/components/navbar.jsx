import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';

async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className='flex justify-between items-center bg-zinc-900 text-white px-24'>
      <Link href='/'>
        <h1 className='text-xl font-bold'>NextAuth</h1>
      </Link>

      <ul className='flex gap-x-16'>
        {!session?.user ? (
          <>
            <li className='hover:text-blue-500 hover:bg-zinc-950 trasition duration-300 p-3'>
              <Link href='/'>Home</Link>
            </li>
            <li className='hover:text-blue-500 hover:bg-zinc-950 trasition duration-300 p-3'>
              <Link href='/auth/login'>Login</Link>
            </li>
            <li className='hover:text-blue-500 hover:bg-zinc-950 trasition duration-300 p-3'>
              <Link href='/auth/register'>Register</Link>
            </li>
          </>
        ) : (
          <>
            <li className='hover:text-blue-500 hover:bg-zinc-950 trasition duration-300 p-3'>
              <Link href='/dashboard'>Dashboard</Link>
            </li>
            <li className='hover:text-blue-500 hover:bg-zinc-950 trasition duration-300 p-3'>
              <Link href='/dashboard/settings'>Settings</Link>
            </li>
            <li className='hover:text-blue-500 hover:bg-zinc-950 trasition duration-300 p-3'>
              <Link href='/api/auth/signout'>Logout</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
