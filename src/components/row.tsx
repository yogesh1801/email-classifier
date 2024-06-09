import React from 'react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function Row(props : any) {
  const getEmailBody = (email : any) => {
    const emails = JSON.parse(localStorage.getItem("emails") || "[]");
    const index = emails.findIndex(
      (e : any) => e.sender === email.sender && e.subject === email.subject
    );
    return index !== -1 ? emails[index].body : "Body not found";
  };

  const openSheet = (email : any) => {
    console.log("Opening sheet for email:", email);
    const body = getEmailBody(email);
    console.log("Email body:", body);
  };

  return (
    <div className="flex justify-center mx-10 mt-5">
      <Table>
        <TableCaption>A list of your recent Emails.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[1000px]">Details</TableHead>
            <TableHead className="w-[80px]">Labels</TableHead>
            <TableHead className="w-[80px]">View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.emails.map((email : any) => (
            <TableRow key={email.sender}>
              <TableCell className="font-medium">{`${email.sender} - ${email.subject}`}</TableCell>
              <TableCell>{email.label}</TableCell>
              <TableCell>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" onClick={() => openSheet(email)}>Open</Button>
                  </SheetTrigger>
                  <SheetContent className="w-full sm:w-full" side={"top"}>
                    <SheetHeader>
                      <SheetTitle>Email details</SheetTitle>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="subject" className="text-right">
                          Subject
                        </Label>
                        <span id="subject" className="col-span-3">{email.subject}</span>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="sender" className="text-right">
                          Sender
                        </Label>
                        <span id="sender" className="col-span-3">{email.sender}</span>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="label" className="text-right">
                          Label
                        </Label>
                        <span id="label" className="col-span-3">{email.label}</span>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="body" className="text-right">
                          Body
                        </Label>
                        <div
                          id="body"
                          className="col-span-3"
                          dangerouslySetInnerHTML={{ __html: getEmailBody(email) }}
                        ></div>
                      </div>
                    </div>
                    <SheetFooter>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
