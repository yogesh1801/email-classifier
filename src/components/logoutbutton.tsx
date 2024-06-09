"use client"

import { Button } from "./ui/button";

export default async function LogoutButton () {
    return <Button variant="outline" className="ml-2" onClick={() =>{
        window.location.href = "/api/logout"
    }}>
    Logout
    </Button>
}