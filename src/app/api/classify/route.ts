import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

interface Email {
    subject: string;
    sender: string;
    label: string;
}

export async function POST(req: Request, res: NextResponse) {
    const response = await req.json()
    const { emails: emailsString, openaiKey } = response
    console.log(emailsString)
    try {
        const emails: Email[] = JSON.parse(emailsString);

        const response = await axios.post("https://api.openai.com/v1/classifications", {
            model: "text-classification",
            query: emails.map((email: Email) => email.subject),
            examples: emails.map((email: Email) => ({
                label: email.label,
                text: email.subject
            }))
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiKey}`
            }
        });

        NextResponse.json(response.data);
    } catch (error : any) {
        console.error("Error labeling emails:", error.response?.data || error.message);
        NextResponse.json({ error: "Internal Server Error" });
    }
}
