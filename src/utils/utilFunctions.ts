import axios from "axios";

export const handleRecaptchaValidation = async (executeRecaptcha: ((action?: string | undefined) => Promise<string>) | undefined) => {
    if (!executeRecaptcha) return null;
    const token = await executeRecaptcha("formSubmit");
    const verificationRes = (
        await axios.post(process.env.NEXT_PUBLIC_APP_URL + "/api/recaptcha-validation", {
            token,
        })
    ).data;
    return verificationRes.status;
};
