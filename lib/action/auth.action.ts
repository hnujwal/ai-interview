'use server';

import { db } from "@/firebase/client";
import { getAuth } from "firebase-admin/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { cookies } from "next/headers";

export async function signUp(params:SignUpParams) {
    const {uid,name,email}=params;

    try{
        const userRecord = await getDoc(doc(db, 'users', uid));
        if(userRecord.exists()){
            return{
                success:false,
                message:'This user already exists.'
            }
        }
        await setDoc(doc(db, 'users', uid), {
            name,
            email
        })
        return{
            success:true,
            message:'Account created successfully.'
        }
    }
    catch(e: any ){
            console.error("error creating a user",e);
            if(e.code === 'auth/email-already-in-use'){
                return{
                    message:'This email is already in use.'
                }
            }
            return{
                success:false,
                message:'Something went wrong. Please try again later.'
            }
    }
    
}
export async function signIn(params:SignInParams) {
    const {email,idToken}=params;

    try{
        const userRecord = await getDoc(doc(db, 'users', email));
        if(!userRecord.exists()){
            return{
                success:false,
                message:'This user does not exist.'
            }
        }
        await setSessionCookie(idToken);
    }
    catch(e: unknown ){
            console.error("error signing in", e);
            return{
                success:false,
                message:'Something went wrong. Please try again later.'
            }
    }

}
export async function setSessionCookie(idToken:string) {
    const cookieStore = await cookies();
    const sessionCookis=await getAuth().createSessionCookie(idToken,{
        expiresIn: 60*60*24*7*1000,
    })
    cookieStore.set('session',sessionCookis,{
        maxAge:60*60*24*7*1000,
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        path:'/',
        sameSite:'lax'
    })
    
}
export async function getCurrentuser():Promise<User | null> {
    const cookieStore=await cookies();
    const sessionCookie=cookieStore.get('session')?.value;
    if(!sessionCookie) return null;
    try{
        const decodetClaims= await getAuth().verifySessionCookie(sessionCookie, true);
        const userRecord=await getDoc(doc(db, 'users', decodetClaims.uid));
        if(!userRecord.exists()) return null;
        return{
            ...userRecord.data(),
            id:userRecord.id
        }as User;
    } catch(e){
        console.log(e)
        return null;
    }
    
}
export async function isAuthenticated(){
    const user=await getCurrentuser();
    return !!user;
}