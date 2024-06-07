import { Button } from "@/components/ui/button"
import Thememode from "./thememode"
import { signOut } from "@/auth"
import UserAvatar from "./userAvatar"

export default function Navbar (){
  
    return (
    <div className="flex justify-between">
    <div className="my-5 mx-4 flex justify-end">
    <UserAvatar />
    <h4 className="scroll-m-20 text-sm font-semibold tracking-tight ml-4">
      YOGESH SINGLA<br/>
      yogeshsinglaiitr@gmail.com
    </h4>
    </div>
    <div className="my-5 mx-4 flex justify-end">
    <Thememode />
    <form action={async () => {
      "use server"
      await signOut({ redirectTo: "/" })
    }}>
      <Button type="submit" variant="outline" className="ml-2">
      Logout
    </Button>
    </ form>
    </div>
    </div>)    
}