import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Key(){
    return <>
        <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl flex justify-center mt-[180px]">
        Get your important Emails labelled
        </h2>
        <div className="flex justify-center mt-5">
            <Input className="w-1/4" type="string" placeholder="OpenAI Key"/>
        </div>
        <div className="flex justify-center mt-5">
        <Button variant={"outline"}>Next</Button>
        </div>
    </>
}