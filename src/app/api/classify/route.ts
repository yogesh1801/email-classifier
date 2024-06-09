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
    console.log(emailsString)
    try {
        const emails: Email[] = JSON.parse(emailsString);

        const response = await axios.post("https://api.openai.com/v1/chat/completions", {
            "model": "gpt-3.5-turbo",
            "messages" : [{role: "user", content : emails + " " + "read these emails and give them a label out of important, marketing, spam, personal and return updated emails in same format with the updated lables"}],
            "temperature": 0.7
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiKey}`
            }
        });
        // This is untested due to unavailibility of openAI keys
        NextResponse.json(response.data.choices[0].message.content);
    } catch (error : any) {
        console.error("Error labeling emails:", error.response?.data || error.message);
        NextResponse.json({ error: "Internal Server Error" });
    }
}
