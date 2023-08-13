import { randomBytes, createHash } from "crypto";

export const generateRandomToken = () => {
    const resetToken = randomBytes(32).toString("hex");
    const hashedToken = createHash("sha256").update(resetToken).digest("hex");
    return {
        token: resetToken,
        hashedToken: hashedToken,
        expires: Date.now() + 10 * 60 * 1000,
    };
};

export const hashToken = (token: string) => {
    return createHash("sha256").update(token).digest("hex");
};

export const signOutUser = async () => {
    try {
        const { csrfToken } = await (await fetch(`${process.env.APP_URL}/api/auth/csrf`)).json();
        // const fetchOptions = {
        //     method: "post",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         csrfToken,
        //         callbackUrl: process.env.APP_URL,
        //         json: true,
        //     }),
        // };
        const fetchOptions = {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            // @ts-expect-error
            body: new URLSearchParams({
                csrfToken,
                json: true,
            }),
        };

        const res = await fetch(`${process.env.APP_URL}/api/auth/signout`, fetchOptions);
        const data = await res.json();
        return res.status === 200;
    } catch (err) {
        return false;
    }
};
