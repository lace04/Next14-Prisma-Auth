import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { signOut } from 'next-auth/react';
import { authOptions } from '../../../api/auth/[...nextauth]/route';

async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <section className='h-[calc(100vh-3rem)] flex justify-center items-center'>
      <div>
        <h1 className='text-white text-5xl'>Settings</h1>
        <pre>
          {
            JSON.stringify(session, null, 2)
          }
        </pre>
      </div>
    </section>
  );
}

export default DashboardPage;
