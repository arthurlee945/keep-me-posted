import { createTransport } from "nodemailer";

type messageOptType = {
    from?: string;
    to: string;
    subject: string;
    text: string;
    html?: string;
};
export const sendEmail = async (messageOpt: messageOptType) => {
    const { EMAIL_USERNAME, EMAIL_PASSWORD } = process.env;
    const { sendMail } = createTransport({
        service: "gmail",
        auth: {
            user: EMAIL_USERNAME,
            pass: EMAIL_PASSWORD,
        },
    });

    let message = {
        from: `"Keep Me Posted" <${EMAIL_USERNAME}>`,
        ...messageOpt,
    };
    try {
        const test = await sendMail(message);
        console.log(test);
        return {
            status: "success",
            message: "email is sent successfully",
        };
    } catch (err) {
        console.error(err);
        return {
            status: "failed",
            message: JSON.stringify(err),
        };
    }
};
