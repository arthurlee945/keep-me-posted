import { randomBytes, createHash } from "crypto";
import jwt from "jsonwebtoken";

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

export const createJwtToken = (id: string) => {
    if (!process.env.NEXTAUTH_SECRET) throw new Error("JWT SECRET required");
    return jwt.sign({ id }, process.env.NEXTAUTH_SECRET);
};
export const fromDate = (time: number, date = Date.now()) => {
    return new Date(date + time * 1000);
};
// export const signOutUser = async () => {
//     try {
//         const { csrfToken } = await (await fetch(`${process.env.APP_URL}/api/auth/csrf`)).json();
//         const fetchOptions = {
//             method: "post",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 csrfToken,
//                 callbackUrl: process.env.APP_URL,
//                 json: true,
//             }),
//         };
//         const res = await fetch(`${process.env.APP_URL}/api/auth/signout`, fetchOptions);
//         return res.status === 200;
//     } catch (err) {
//         return false;
//     }
// };

// export const userIsValid = async () => {
//     const session = (await getServerSession(authOptions)) as Session & { user: { iat: number } };
//     if (!session || !session.user || !session.user.email || !session.user.iat) return;

//     const user = await prisma.user.findFirst({
//         where: { email: session.user?.email },
//         select: { passwordChangedAt: true },
//     });
//     if (!user || (user.passwordChangedAt && user.passwordChangedAt.getTime() > session.user.iat * 1000)) redirect("/auth/signout");
// };
