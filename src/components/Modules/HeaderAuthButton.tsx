"use client";
import { FC } from "react";
import DefaultButton from "../subComponents/DefaultButton";
import { useSession } from "next-auth/react";

interface HeaderAuthButtonProps {}

const HeaderAuthButton: FC<HeaderAuthButtonProps> = () => {
    const { status } = useSession();
    return (
        <DefaultButton
            buttonType="link"
            href={status === "loading" ? "#" : status === "unauthenticated" ? "/auth/signin" : "api/auth/signout"}
        >
            {status === "loading" ? "Loading..." : status === "unauthenticated" ? "Get Started/Log In" : "Sign Out"}
        </DefaultButton>
    );
};

export default HeaderAuthButton;
