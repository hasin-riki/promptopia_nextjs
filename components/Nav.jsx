"use client";

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders]=useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders=async () => {
      const response=await getProviders();
      setProviders(response);
    }

    setUpProviders();
  }, [])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image src='/assets/images/logo.svg' alt='Promptopia Logo' width={30} height={30} className='object-contain' />
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? 
        <div className='flex gap-3 md:gap-5'>
          <Link href='/create-prompt' className='black_btn'>
            Create Prompt
          </Link>
          <button type='button' onClick={signOut} className='outline_btn'>
            Sign Out
          </button>
          <Link href='/profile'>
            <Image src={session?.user.image} alt='profile' width={37} height={37} className='rounded-full' onClick={()=>null} />
          </Link>
        </div> :
        <>
          {providers && Object.values(providers).map(provider => (
            <button type='button' key={provider.name} className='black_btn' onClick={()=>signIn(provider.id)}>Sign In</button>
          ))}
        </>}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? 
        <div className='flex'>
          <Image src={session?.user.image} alt='profile' width={37} height={37} className='rounded-full cursor-pointer' onClick={() => setToggleDropdown(prev=>!prev)} />
          {toggleDropdown && (
            <div className='dropdown'>
              <Link href='/profile' className='dropdown_link' onClick={() => setToggleDropdown(false)}>My Profile</Link>
              <Link href='/create-prompt' className='dropdown_link' onClick={() => setToggleDropdown(false)}>Create Prompt</Link>
              <button type='button' onClick={()=>{setToggleDropdown(false); signOut();}} className='black_btn mt-5 w-full'>Sign Out</button>
            </div>
          )}
        </div> :
        <>
        {providers && Object.values(providers).map(provider => (
          <button type='button' key={provider.name} className='black_btn' onClick={()=>signIn(provider.id)}>Sign In</button>
        ))}
        </>}
      </div>

    </nav>
  )
}

export default Nav;