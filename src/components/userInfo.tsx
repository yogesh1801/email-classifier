import { auth } from "@/auth";

export default async function UserInfo (){
    const session = await auth()
    if (session==null) return null 
    else {
        return (
            <h4 className="scroll-m-20 text-sm font-semibold tracking-tight ml-4">
            {session.user.name}<br/>
            {session.user.email}
            </h4>
        )
    }
}