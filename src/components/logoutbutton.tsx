"use client"

import { Button } from "./ui/button";

export default function LogoutButton () {
    return <Button variant="outline" className="ml-2" onClick={() =>{
        window.localStorage.removeItem('emails')
        window.location.href = "/api/logout"
    }}>
    Logout
    </Button>
}