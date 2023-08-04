"use client";

import { useSession } from "next-auth/react";

type Props = {};

const User = (props: Props) => {
    const { data: session } = useSession();
    return (
        <>
            <p>client</p>
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </>
    );
};

export default User;
