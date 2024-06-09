"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function Key(){

    const [key,setKey] = useState("")

    return <>
        <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl flex justify-center mt-[180px]">
        Get your important Emails labelled
        </h2>
        <div className="flex justify-center mt-5">
            <Input className="w-1/4" type="text" placeholder="OpenAI Key" onChange={(e) => {
                setKey(e.target.value)
            }}/>
        </div>
        <div className="flex justify-center mt-5">
        <Button variant={"outline"} onClick={() => {
            localStorage.setItem('OPENAI_KEY', key)
            window.location.href = "/dashboard"
        }}>Next</Button>
        </div>
    </>
}