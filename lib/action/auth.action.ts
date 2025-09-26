'use server';

import { db,auth } from "@/firebase/admin";
import { cookies } from "next/headers";

export async function signUp(params:SignUpParams) {
    const {uid,name,email}=params;

    try{
        const userRecord = await db.collection("user").doc(uid).get();
        if(userRecord.exists)
            return{
                success:false,
                message:'This user already exists.'
            }
        await db.collection("users").doc(uid).set({
            name,
            email,
        })
        return{
            success:true,
            message:'Account created successfully.'
        }
    }
    catch(error: any ){
            console.error("error creating a user",error);
            if(error.code === 'auth/email-already-exists'){
                return{
                    success:false,
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
        const userRecord = await auth.getUserByEmail(email);
        if(!userRecord)
            return{
                success:false,
                message:'This user does not exist.'

        }
        await setSessionCookie(idToken);
    }
    catch(error: any){
            console.error("");
            return{
                success:false,
                message:'Something went wrong. Please try again later.'
            }
    }

}
export async function setSessionCookie(idToken:string) {
    const cookieStore = await cookies();
    const sessionCookis=await auth.createSessionCookie(idToken,{
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
export async function getCurrentUser():Promise<User | null> {
    const cookieStore=await cookies();
    const sessionCookie=cookieStore.get('session')?.value;
    if(!sessionCookie) return null;
    try{
        const decodetClaims= await auth.verifySessionCookie(sessionCookie, true);
        const userRecord=await db.collection("user").doc(decodetClaims.uid).get();
        if(!userRecord.exists) return null;
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
    const user=await getCurrentUser();
    return !!user;
}



