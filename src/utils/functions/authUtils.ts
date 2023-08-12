import axios from "axios";
import { randomBytes, createHash } from "crypto";
import { prisma } from "../database/prisma";

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
        const { csrfToken } = await (await fetch(process.env.APP_URL + "/api/auth/csrf")).json();
        console.log(csrfToken);
        const signoutFD = new FormData();
        signoutFD.set("csrfToken", csrfToken);
        const data = await fetch(process.env.APP_URL + "/api/auth/signout?callbackUrl=/api/auth/session", {
            method: "POST",
            body: JSON.stringify({ csrfToken }),
        });
    } catch (err) {
        console.log(err);
    }
};

export const resetPasswordIsValid = async (token: string) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                resetPasswordToken: token,
            },
            select: {
                resetPasswordExpires: true,
            },
        });
        if (!user || (user.resetPasswordExpires && user.resetPasswordExpires < new Date())) return false;
        return true;
    } catch (err) {
        return false;
    }
};
