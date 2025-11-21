import Image from "next/image";
import Link from "next/link";

import logo from "@/src/assets/images/logo.png";
import logoDark from "@/src/assets/images/logowhite.png";

const LogoContainer = () => {
    return (
        <>
            <Link href="/dashboard/ordenes" className="logo-box">
                <div className="logo-dark">
                    <Image
                        src={logo}
                        className="logo-lg h-[50px] px-2"
                        alt="Light logo"
                    />
                </div>

                <div className="logo-light">
                    <Image
                        src={logoDark}
                        className="logo-lg h-[50px] px-2"
                        alt="Dark logo"
                    />
                </div>
            </Link>
        </>
    );
};

export default LogoContainer;
