
import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import { Link } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <>
    <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg'>
            <h2>Get Interview-Ready with AI-Powered Parctice and Feedback</h2>
            <p className='text-lg'>
                Practice on real interview qustion and get instant feedback
            </p>
            <Button asChild className='btn-primary max-sm:w-full'></Button>
            <Link href='/interview'>Start an Interview</Link>
        </div>
        <Image src="/robot.png" alt="robot-dude" width={400} height={400} className="max-sm:hidden"/>
    </section>
    <section className='flex flex-col gap-6 mt-8'>
        <h2>Your Interview</h2>
        <div className='interview-section'>
            {dummyInterviews.map((interview)=>(<InterviewCard{...interview} key={interview.id}/>))}
        </div>
    </section>
    <section className='flex flex--col gap-6 mt-8'>
        <h2>Take an Interview</h2>
        <div className='interview-section'>
             {dummyInterviews.map((interview)=>(<InterviewCard{...interview} key={interview.id}/>))}
            <p>There are no interview avilable</p>
        </div>
    </section>
    </>
  )
}

export default page