import React from 'react'
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png";
import {auth, signIn,signOut} from "@/auth";
import {BadgePlus, LogOut} from "lucide-react";
import {Avatar, AvatarImage} from "@/components/ui/avatar"

const Navbar = async () => {
    const session = await auth();


    return (
        <header className="px-5 bg-[141413] font-work-sans">
            <nav className="flex flex-wrap items-center justify-between">
                <Link href="/">
                    <Image src={logo} alt="logo" width={90} height={30}/>
                </Link>
                <div >
                    {session && session?.user ?(
                        <div className="flex items-center gap-5">
                            <Link href="/startup/create">
                                <span className="max-sm:hidden">Create</span>
                                <BadgePlus className="size-6 sm:hidden text-red-500"/>
                            </Link>
                            <form action={async()=>{
                                "use server";
                                await signOut({redirectTo:"/"});
                            }}><button type="submit" className="max-sm:hidden">Logout</button>
                                <LogOut className="size-6 sm:hidden text-red-500" />
                            </form>

                                <Link href={`/user/${session?.id}`} className="flex items-center gap-5">
                                    <span className="max-sm:hidden">{session?.user?.name}</span>
                                    <Avatar className="size-10">
                                        <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""}></AvatarImage>
                                    </Avatar>
                                </Link>

                        </div>
                    ):(
                        <form action={async() => {
                            "use server";
                            await signIn('github');
                        }}>

                            <button type="submit">Login</button>

                        </form>
                    )}
                </div>
            </nav>
        </header>
    )
}
export default Navbar
