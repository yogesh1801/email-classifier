import Homepage from "@/components/homepage"
import { FaGoogle } from 'react-icons/fa';
import { Button } from "@/components/ui/button"
import { signIn, auth } from "@/auth"

export default function Home(){
  return <>
    <Homepage />
    <div className="flex justify-center mt-5">
      <form action={ async () => {
        "use server"
        try{
          await signIn("google", { redirectTo: "/key" })
        }
        catch(err){
          throw err
        } 
      }}>
        <Button className="border"><FaGoogle className="mr-2" />
        Google</Button>
      </form>
    </div>
  </>
}