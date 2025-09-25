import Agent from '@/components/Agent'
import { getCurrentuser } from '@/lib/action/auth.action'
import React from 'react'

const page = async () => {
  const user=await getCurrentuser();
  return (
    <>
    <h3> Interview Generation</h3>
    <Agent 
    userName='{user?.name ||}' userId='{user?.id}' type='generate'/>
    </>
  )
}

export default page
