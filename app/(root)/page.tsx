
import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { getCurrentuser} from '@/lib/action/auth.action'
import { getInterviewBuUserId, getLatestInterviews } from '@/lib/action/general.action'
import { Link } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const page = async () => {
    const user= await getCurrentuser();
    const [userInterviews,latestInterviews]=await Promise.all([
        await getInterviewBuUserId(user?.id!),
        await getLatestInterviews({userId: user?.id!})
    ]);
    const hasPastInterviews= userInterviews?.length>0;
    const hasupcomingInterviews=latestInterviews?.length>0;
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
            {
            hasPastInterviews ?(
                userInterviews?.map((interview)=>(
                    <InterviewCard{...interview} key={interview.id}/>
                ))):(
                    <p>You have&apos;t taken any interview yet</p>
                )
        }
        </div>
    </section>
    <section className='flex flex--col gap-6 mt-8'>
        <h2>Take an Interview</h2>
        <div className='interview-section'>
{
            hasupcomingInterviews ?(
                latestInterviews?.map((interview)=>(
                    <InterviewCard{...interview} key={interview.id}/>
                ))):(
                    <p>You have&apos;t taken any interview yet</p>
                )
        }            <p>There are no interview avilable</p>
        </div>
    </section>
    </>
  )
}

export default page