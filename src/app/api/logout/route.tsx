import { signOut } from '@/auth';
import { cookies as nextCookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req : NextRequest){
    const cookieStore = nextCookies();
    cookieStore.delete('gtoken')
    await signOut({redirectTo : "/"})
} 