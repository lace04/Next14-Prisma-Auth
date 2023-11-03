'use client';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [error, setError] = useState(null);

  const onSubmit = handleSubmit(async (data) => {
    // console.log(data);

    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    console.log(res);
    if (res.error) {
      setError(res.error);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  });

  return (
    <div className='h-[calc(100vh-7rem)] flex flex-col justify-center items-center'>
      <form onSubmit={onSubmit} className='w-1/4 p-4 bg-zinc-900 rounded-md'>
        {error && (
          <p className='bg-red-500 text-lg text-white p-3 rounded mb-2'>
            {error}
          </p>
        )}

        <h1 className='text-3xl text-slate-300 mb-2 font-semibold'>Sign In</h1>
        <div className='mb-2'>
          <label htmlFor='email' className='text-slate-500 mb-1 block text-sm'>
            Email:
          </label>
          <input
            type='email'
            {...register('email', { required: true })}
            className='p-2 rounded-md block bg-neutral-800 text-slate-300 w-full'
            autoComplete='off'
            placeholder='mail@test.com'
            autoFocus
          />
          {errors.email && (
            <span className='text-red-600 text-xs'>{errors.email.message}</span>
          )}
        </div>

        <div className='mb-2'>
          <label
            htmlFor='password'
            className='text-slate-500 mb-1 block text-sm'
          >
            Password:
          </label>
          <input
            type='password'
            {...register('password', { required: true })}
            className='p-2 rounded-md block bg-neutral-800 text-slate-300 w-full'
            placeholder='*******'
          />
          {errors.password && (
            <span className='text-red-600 text-xs'>
              {errors.password.message}
            </span>
          )}
        </div>

        <button className='w-full bg-blue-500 text-white p-3 rounded-lg mt-2'>
          Login
        </button>
      </form>
    </div>
  );
}
export default LoginPage;
