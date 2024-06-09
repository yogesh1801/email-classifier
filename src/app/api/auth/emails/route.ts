import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { Auth, google } from 'googleapis';
import jwt from 'jsonwebtoken';
import { cookies as nextCookies } from 'next/headers';
    

interface Message {
    subject: string;
    sender: string;
    body: string;
    label : string;
}

export async function GET(req: NextRequest) {
    const session = await auth();
    const secret = process.env.AUTH_SECRET || 'secret';

    if (!session) {
        return NextResponse.redirect(new URL('/', req.nextUrl).toString());
    }

    const searchParams = req.nextUrl.searchParams;
    const code = searchParams.get('code');
    const cookieStore = nextCookies();
    const gtoken = cookieStore.get('gtoken');

    const oauth2Client = new google.auth.OAuth2(
        process.env.AUTH_GMAIL_ID!,
        process.env.AUTH_GMAIL_SECRET!,
        process.env.REDIRECT_URL!
    );

    if (gtoken) {
        try {
            const value = gtoken.value;
            const tokens = jwt.verify(value, secret) as Auth.Credentials;
            oauth2Client.setCredentials(tokens);

            const newTokens = await oauth2Client.getAccessToken();
            tokens.access_token = newTokens.token;
            oauth2Client.setCredentials(tokens);

            const newSecureToken = jwt.sign(tokens, secret);
            cookieStore.set({
                name: 'gtoken',
                value: newSecureToken,
                httpOnly: true,
                path: '/',
                secure: process.env.NODE_ENV === 'production',
            });
            const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

            const gmailResponse = await gmail.users.messages.list({
                userId: 'me',
                maxResults: 15,
            });
            const messages = gmailResponse.data.messages || [];

            const fullMessages: Message[] = await Promise.all(
                messages.map(async (message) => {
                    const messageDetails = await gmail.users.messages.get({
                        userId: 'me',
                        id: message.id!,
                        format: 'full',
                    });

                    const headers = messageDetails.data.payload?.headers;
                    const subject = headers?.find(header => header.name === 'Subject')?.value || '';
                    const sender = headers?.find(header => header.name === 'From')?.value || '';
                    const label = '';

                    let body = '';
                    if (messageDetails.data.payload?.parts) {
                        body = Buffer.from(messageDetails.data.payload.parts[0]?.body?.data || '', 'base64').toString();
                        console.log(body)
                    }

                    return {
                        subject,
                        sender,
                        body,
                        label
                    };
                })
            );
            return NextResponse.json({ messages: fullMessages });
        } catch (error) {
            cookieStore.delete('gtoken');
            return NextResponse.json({ "error": error })
        }
    }

    if (code) {
        try {
            const { tokens } = await oauth2Client.getToken(code);
            oauth2Client.setCredentials(tokens);

            const securetoken = jwt.sign(tokens, secret);

            const response = NextResponse.redirect(new URL('/dashboard', req.nextUrl).toString());
            response.cookies.set({
                name: 'gtoken',
                value: securetoken,
                httpOnly: true,
                path: '/',
                secure: process.env.NODE_ENV === 'production',
            });

            const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

            const gmailResponse = await gmail.users.messages.list({
                userId: 'me',
                maxResults: 15,
            });

            const messages = gmailResponse.data.messages || [];

            const fullMessages: Message[] = await Promise.all(
                messages.map(async (message) => {
                    const messageDetails = await gmail.users.messages.get({
                        userId: 'me',
                        id: message.id!,
                        format: 'full',
                    });

                    const headers = messageDetails.data.payload?.headers;
                    const subject = headers?.find(header => header.name === 'Subject')?.value || '';
                    const sender = headers?.find(header => header.name === 'From')?.value || '';
                    const label = '';

                    let body = '';
                    if (messageDetails.data.payload?.parts) {
                        body = Buffer.from(messageDetails.data.payload.parts[0]?.body?.data || '', 'base64').toString();
                    }

                    return {
                        subject,
                        sender,
                        body,
                        label
                    };
                })
            );

            console.log(fullMessages);
            return response
        } catch (error) {
            const response = NextResponse.redirect(new URL('/dashboard', req.nextUrl).toString());
            response.cookies.delete('gtoken');
            return response;
        }
    } else {
        const scopes = ['https://www.googleapis.com/auth/gmail.readonly'];
        const url = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
        });

        return NextResponse.json({"link" : url});
    }
}
