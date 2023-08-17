import Link from 'next/link';
import { FC, HTMLAttributes, ReactNode } from 'react';

type MainButtonProps = {
  children: ReactNode;
  className?: string;
} & (LinkProps | ButtonProps);

type LinkProps = {
  buttonType: 'link';
  href: string;
  target?: string;
} & HTMLAttributes<HTMLAnchorElement>;
type ButtonProps = {
  buttonType: 'button';
  onClick: () => void;
} & HTMLAttributes<HTMLButtonElement>;

const DefaultButton: FC<MainButtonProps> = (props) => {
  const { children, className } = props;
  const classList =
    "text-[1.1rem] whitespace-nowrap px-8 py-1 rounded-md text-zinc-100 dark:text-zinc-900 transition-colors font-semibold align-middle hover:dark:bg-zinc-300 hover:bg-zinc-700 bg-[url('../styles/icons/x.svg')]  bg-zinc-900 dark:bg-zinc-100 bg-[length:10px] shadow-md ";

  if (props.buttonType === 'button') {
    const { onClick } = props;
    return (
      <button onClick={onClick} className={classList + className}>
        {children}
      </button>
    );
  }
  const { href, target = '_self' } = props;
  return (
    <Link className={classList + className} href={href} target={target}>
      {children}
    </Link>
  );
};

export default DefaultButton;
