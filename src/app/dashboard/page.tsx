"use client"

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Row } from "@/components/row";
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface Email {
    subject: string;
    sender: string;
    label: string;
}

export default function Dashboard() {
    const [emails, setEmails] = useState<Email[]>([]);
    const [selectedEmailCount, setSelectedEmailCount] = useState<number>(5);
    const [loadingEmail, setLoadingEmail] = useState<boolean>(false);
    const [loadingLabel, setLoadingLabel] = useState<boolean>(false);
    const [openaiKey, setOpenaiKey] = useState<string>("");

    useEffect(() => {
        const rawEmails = window.localStorage.getItem('emails');
        if (rawEmails) {
            const emailArray = JSON.parse(rawEmails);
            const processedEmails = emailArray.map((email: any) => ({
                subject: email.subject,
                sender: email.sender,
                label: email.label,
            }));
            setEmails(processedEmails);
        }
        const storedOpenaiKey = window.localStorage.getItem('OPENAI_KEY');
        if (storedOpenaiKey) {
            setOpenaiKey(storedOpenaiKey);
        }
    }, []);

    const handleEmailCountChange = (value: string) => {
        setSelectedEmailCount(parseInt(value));
    };

    const labelEmails = async () => {
        setLoadingLabel(true);
        try {
            const response = await axios.post("/api/classify", {
                emails: JSON.stringify(emails),
                openaiKey,
            });
            
            const classifiedEmails = response.data;
            const updatedEmails = emails.map((email: any, index: number) => ({
                ...email,
                label: classifiedEmails[index]?.label || "Unclassified"
            }));
    
            setEmails(updatedEmails);
        } catch (error) {
            console.error("Error labeling emails:", error);
        } finally {
            setLoadingLabel(false);
        }
    };

    return (
        <>
            <div className="flex justify-center mx-10">
                <div className="mt-[80px] flex flex-col md:flex-row justify-between w-full">
                    <div>
                        <Button variant="outline" className="ml-2" onClick={async () => {
                            setLoadingEmail(true);
                            const response = await axios.get("/api/auth/emails");
                            if (response.data.link) {
                                window.location.href = response.data.link;
                            } else {
                                const messages = response.data.messages;
                                window.localStorage.setItem("emails", JSON.stringify(messages));
                            }
                            setLoadingEmail(false);
                        }}>
                            {loadingEmail ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Fetch Emails
                        </Button>
                        <div className="mt-3 mx-2">
                            <Select value={selectedEmailCount.toString()} onValueChange={handleEmailCountChange}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select Emails" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Select Emails</SelectLabel>
                                        {[...Array(15).keys()].map((i) => (
                                            <SelectItem key={i + 1} value={(i + 1).toString()}>
                                                {i + 1}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="mt-2 md:mt-0">
                        <Button variant="outline" className="ml-2 mr-5" onClick={labelEmails}>
                            {loadingLabel ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Label Emails
                        </Button>
                    </div>
                </div>
            </div>
            <Row emails={emails.slice(0, selectedEmailCount)} />
        </>
    );
}
