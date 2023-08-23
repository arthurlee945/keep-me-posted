'use client';
import Link from 'next/link';
import { useState } from 'react';

const AboutContent = () => {
    const [textSize, setTextSize] = useState<'little' | 'normally' | 'loudly'>('little');
    return (
        <section className="flex w-3/5 flex-col gap-y-4 mobile:w-full">
            <h1 className="text-2xl font-semibold">
                Let me tell you{' '}
                <button
                    className={`${
                        textSize === 'little' ? 'text-teal-600' : textSize === 'normally' ? 'text-cyan-600' : 'text-sky-600'
                    } text-2xl font-bold underline hover:no-underline`}
                    onClick={() => setTextSize(textSize === 'little' ? 'normally' : textSize === 'normally' ? 'loudly' : 'little')}
                >
                    {textSize}
                </button>{' '}
                about Keep Me Posted
            </h1>
            <div
                className={`${
                    textSize === 'little' ? 'text-[0.5rem]' : textSize === 'normally' ? 'text-base' : 'text-xl'
                }  flex flex-col gap-y-2`}
            >
                <p>This app is created to test NextAuth and App directory for other production apps.</p>
                <p>This app utilizes multiple api routes and jwt/middleware to protect routes.</p>
                <p>
                    User data&apos;s stored in postgres hosted on{' '}
                    <Link className="underline hover:no-underline" href="https://railway.app/" target="_blank">
                        Railway
                    </Link>
                    .
                </p>
                <p>Thank you for reading through here especially if you read through it in small font size.</p>
            </div>
        </section>
    );
};

export default AboutContent;
