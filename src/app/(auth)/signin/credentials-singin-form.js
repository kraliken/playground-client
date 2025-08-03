'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInAction } from "@/lib/actions/auth.actions";
import { useActionState } from 'react';

const CredentialsSignInForm = () => {

  const [data, action, isPending] = useActionState(signInAction, {
    success: false,
    message: '',
    errors: {}
  });

  const SignInButton = () => {
    return (
      <Button disabled={isPending} className='w-full mt-6' variant='default'>
        {isPending ? 'Bejelentkezés...' : 'Bejelentkezés'}
      </Button>
    );
  };


  return <form action={action}>
    <div className='space-y-6'>
      <div className='space-y-2'>
        <Label htmlFor='username' className='mb-4'>Felhasználónév</Label>
        <Input
          id='username'
          name='username'
          type='text'
          required
          defaultValue={data?.data?.username || ''}
          className={data?.errors?.username ? 'border-red-400' : ''}
        />
        {data && !data.success && data.errors?.username && (
          <div className='text-sm text-destructive pl-3'>{data.errors.username}</div>
        )}
      </div>
      <div className='space-y-2'>
        <Label htmlFor='password' className='mb-4'>Jelszó</Label>
        <Input
          id='password'
          name='password'
          type='password'
          required
          defaultValue={data?.data?.password || ''}
          className={data?.errors?.password ? 'border-red-400' : ''}
        />
        {data && !data.success && data.errors?.password && (
          <div className='text-sm text-destructive pl-3'>{data.errors.password}</div>
        )}
      </div>
      <div>
        <SignInButton />
      </div>
      {data && !data.success && data.message && (
        <div className='text-sm text-destructive'>{data.message}</div>
      )}
    </div>
  </form>

};

export default CredentialsSignInForm;
