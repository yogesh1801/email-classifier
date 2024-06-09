import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  
  import { Button } from "./ui/button";
    
  export function Row(props : any) {
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
                <TableCell><Button variant={"outline"}>View</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
  