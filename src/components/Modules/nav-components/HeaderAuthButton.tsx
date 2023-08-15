"use client";
import { FC } from "react";
import DefaultButton from "../../subComponents/DefaultButton";
import { signOut, useSession } from "next-auth/react";

interface HeaderAuthButtonProps {
    className?: string;
}

const HeaderAuthButton: FC<HeaderAuthButtonProps> = ({ className }) => {
    const { status } = useSession();
    return (
        <>
            {status === "unauthenticated" || status === "loading" ? (
                <DefaultButton buttonType="link" className={className} href={status === "loading" ? "#" : "/auth/signin"}>
                    {status === "loading" ? "Loading..." : "Get Started/Log In"}
                </DefaultButton>
            ) : (
                <DefaultButton
                    buttonType="button"
                    className={className}
                    onClick={() => {
                        signOut();
                    }}
                >
                    Sign Out
                </DefaultButton>
            )}
        </>
    );
};

export default HeaderAuthButton;
