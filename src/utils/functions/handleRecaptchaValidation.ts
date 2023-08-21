import axios from 'axios';

export const handleRecaptchaValidation = async (executeRecaptcha: ((_action?: string | undefined) => Promise<string>) | undefined) => {
    if (!executeRecaptcha) return null;
    try {
        const token = await executeRecaptcha('formSubmit');
        const verificationRes = (
            await axios.post(
                '/api/recaptcha-validation',
                {
                    token,
                },
                { signal: AbortSignal.timeout(30000) }
            )
        ).data;
        return verificationRes.status;
    } catch (err) {
        return {
            status: 'failed',
        };
    }
};
