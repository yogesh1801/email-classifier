import { Button } from "@/components/ui/button"
import Thememode from "./thememode"
import { signOut } from "@/auth"
import UserAvatar from "./userAvatar"
import { auth } from "@/auth"
import LogoutButton from "./logoutbutton"

export default async function Navbar (){
    const session = await auth()
    return (
    
    <div className="flex justify-between">
    <div className="my-5 mx-4 flex justify-end">
    <UserAvatar />
    {
      session==null ? null : (
        <h4 className="scroll-m-20 text-sm font-semibold tracking-tight ml-4">
        {session.user.name}<br/>
        {session.user.email}
        </h4>
      )
    }
    </div>
    <div className="my-5 mx-4 flex justify-end">
    <Thememode />
    {session == null ? null : (
      <LogoutButton />
    )}
    </div>
    </div>)    
}