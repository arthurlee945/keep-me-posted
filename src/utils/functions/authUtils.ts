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
