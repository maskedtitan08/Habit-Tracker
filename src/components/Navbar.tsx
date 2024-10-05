"use client"
import { useAuth } from "@clerk/nextjs";
import Link from "next/link"

const Navbar = () => {
    const defaultColor = "#d90429";
    const backgroundColorObject = { backgroundColor: defaultColor };
    const { userId } = useAuth();
    return (
        <header>
            <div className="p-8 px-20">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="text-center sm:text-left mb-7 sm:mb-0">
                        <div className="flex gap-2 items-center sm:justify-start justify-center">
                            <span className="text-2xl font-light flex items-center gap-2">
                                <div className="p2 rounded-md" style={backgroundColorObject}>
                                    {/* Icon Code */}
                                </div>
                                <span style={{ color: "#d90429" }} className="font-bold text-mainColor" >Habit</span>
                                <span className="font-light">Tracker</span>
                            </span>
                        </div>
                    </div>
                    {/*Buttons*/}
                    <div>
                        {userId ? (
                            <Link href={"/dashboard"}>
                                <button style={backgroundColorObject}
                                    className="block rounded-lg px-9 py-3 text-sm font-medium text-white transition"
                                    type="button"
                                >
                                    Dashboard
                                </button>
                            </Link>
                        ) : (
                            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                                <Link href={"/sign-up"}>
                                    <button
                                        className="block sm:w-32 w-full border rounded-lg px-9 py-3 text-sm font-medium transition 
                        focus:outline-none hover:bg-customRed hover:text-white border-customRed text-customRed"
                                        type="button"
                                    >
                                        Sign Up
                                    </button>
                                </Link>
                                <Link href={"/sign-in"}>
                                    <button
                                        className="block sm:w-32 w-full border rounded-lg px-9 py-3 text-sm font-medium transition 
                        focus:outline-none hover:bg-customRed hover:text-white border-customRed text-customRed"
                                        type="button"
                                    >
                                        Sign In
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>

                </div>
            </div>

        </header>
    )
}

export default Navbar
