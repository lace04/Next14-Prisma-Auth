'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      return alert('Passwords do not match');
    }

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      router.push('/auth/login');
    } else {
      const responseData = await response.json();
      setErrorMessage(responseData.message);
    }
  });

  return (
    <div className='h-[calc(100vh-7rem)] flex flex-col justify-center items-center'>
      {errorMessage && <span className='text-red-600'>{errorMessage}</span>}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-1/4 p-4 bg-zinc-900 rounded-md'
      >
        <h1 className='text-3xl text-slate-300 mb-2 font-semibold'>Sign Up</h1>

        <div className='mb-2'>
          <label
            htmlFor='username'
            className='text-slate-500 mb-1 block text-sm'
          >
            Username:
          </label>
          <input
            type='text'
            {...register('username', {
              required: {
                value: true,
                message: 'Please enter a username',
              },
            })}
            className='p-2 rounded-md block bg-neutral-800 text-slate-300 w-full'
            autoFocus
            autoComplete='off'
            placeholder='username'
          />
          {errors.username && (
            <span className='text-red-600 text-xs'>
              {errors.username.message}
            </span>
          )}
        </div>

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
          />
          {errors.email && (
            <span className='text-red-600 text-xs'>Please enter an email</span>
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
              Please enter a password
            </span>
          )}
        </div>

        <div className='mb-2'>
          <label
            htmlFor='confirmPassword'
            className='text-slate-500 mb-1 block text-sm'
          >
            Confirm Password:
          </label>
          <input
            type='password'
            {...register('confirmPassword', { required: true })}
            className='p-2 rounded-md block bg-neutral-800 text-slate-300 w-full'
            placeholder='*******'
          />
          {errors.confirmPassword && (
            <span className='text-red-600 text-xs'>
              Please confirm your password
            </span>
          )}
        </div>
        <button className='w-full bg-blue-600 text-slate-200 rounded-md p-2 hover:bg-blue-700 transition duration-300'>
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
