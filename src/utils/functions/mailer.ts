import nodemailer from "nodemailer";

type messageOptType = {
    from?: string;
    to: string;
    subject: string;
    text: string;
    html?: string;
};
export const sendEmail = async (messageOpt: messageOptType) => {
    const { EMAIL_USERNAME, EMAIL_PASSWORD } = process.env;
    const transporter = nodemailer.createTransport({
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
        const res = await transporter.sendMail(message);
        return {
            status: "success",
            message: "email is sent successfully",
            data: JSON.stringify(res),
        };
    } catch (err) {
        console.error(err);
        return {
            status: "failed",
            message: JSON.stringify(err),
        };
    }
};
