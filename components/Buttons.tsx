'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { ProfileImage } from './ProfileImageProps';

export function SignInButton() {
  const { data: session, status } = useSession();
  const src = session?.user?.image; 

  if (status === 'loading') {
    return <>...</>;
  }
  
  if (status === 'authenticated') {
    return (
      <Link href={`/dashboard`}>
        <ProfileImage src={src} />
      </Link>
    );
  }

  return <button onClick={() => signIn()}>Sign in</button>;
}

export function SignOutButton() {
  return <button onClick={() => signOut()}>Sign out</button>;
}

type SimpleButtonProps = {
  small?: boolean,
  gray?: boolean,
  className?: string
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export function SimpleButton({
    small=false,
    gray= false, 
    className="",
    ...props
  }: SimpleButtonProps) {
    const sizeClasses = small ? "px-2 py-1" : "px-4 py-2 font-bold";
    const colorClasses = gray 
    ? "bg-gray-400 hover:bg-gray-300 focus-visible:bg-gray-300" 
    : "bg-blue-500 hover:bg-blue-400 focus-visible:bg-blue-400" 

  return(
    <button className={`rounded-full transition-colors
    duration-200 disabled:cursor-not-allowed disabled:opacity-50
    text-white ${sizeClasses} ${colorClasses} ${className}`} {...props}>

    </button>
  )
}