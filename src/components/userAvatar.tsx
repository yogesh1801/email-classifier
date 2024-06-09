import { auth } from "@/auth"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
 
export default async function UserAvatar() {
  const session = await auth()
  if(session == null) return null
  if(session!=null){
    if (!session.user) return null
    return (
      <Avatar>
      <AvatarImage src={session.user.image || undefined} alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    )
  }
}