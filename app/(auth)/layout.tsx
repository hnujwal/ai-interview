import { isAuthenticated } from '@/lib/action/auth.action';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'

const AuthLayout= async ({children}:{children:ReactNode})=> {
  const isUserAuthnticated =await isAuthenticated();
    if(isUserAuthnticated) redirect('/');
  return (
    <div className='auth-layout'>
      {children}
    </div>
  )
}

export default AuthLayout
