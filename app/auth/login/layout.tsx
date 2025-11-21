
"use client";

import React from "react";

import logo from "@/src/assets/images/logo.png";

import Link from "next/link";
import Image from "next/image";

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex items-stretch h-screen bg-cover bg-center relative bg-no-repeat overflow-x-hidden">
            <div className="lg:max-w-[500px] z-10 p-12 relative w-full h-full min-h-[1165px] border-t-[3px] border-primary bg-white">
                <div className="flex flex-col h-full gap-4">
                    <div className="mb-8 text-center lg:text-start">
                        <Link href="/" className="flex justify-center">
                            <Image src={logo} alt="logo" className="h-20 block" />
                        </Link>
                    </div>
                        {children}
                    </div>

                    <footer className="text-center justify-center h-14 -mb-12">
                        <p className="text-gray-400">
                            Si no tienes cuenta solicitala a tu administrador
                        </p>
                    </footer>
                </div>
            </div>
    );
}
