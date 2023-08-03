import Link from "next/link";
import { ComponentPropsWithoutRef, FC, HTMLAttributes, ReactNode } from "react";

type MainButtonProps = {
    children: ReactNode;
} & (LinkProps | ButtonProps);

type LinkProps = {
    buttonType: "link";
    href: string;
    target?: string;
} & HTMLAttributes<HTMLAnchorElement>;
type ButtonProps = {
    buttonType: "button";
    onClick: () => void;
} & HTMLAttributes<HTMLButtonElement>;

const DefaultButton: FC<MainButtonProps> = (props) => {
    const { children } = props;
    if (props.buttonType === "button") {
        const { onClick } = props;
        return <button onClick={onClick}>{children}</button>;
    }
    const { href, target = "_self" } = props;
    return (
        <Link href={href} target={target}>
            {children}
        </Link>
    );
};

export default DefaultButton;
