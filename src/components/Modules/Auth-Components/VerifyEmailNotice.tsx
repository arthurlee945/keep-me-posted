import axios, { AxiosError } from 'axios';

const VerifyEmailNotice = async ({ token }: { token: string | undefined }) => {
    if (!token) {
        return 'No Token Provided';
    }
    try {
        const { data } = await axios.post(process.env.APP_URL + '/api/auth/verify-email', { token });
        return data.message || 'Thank you for verifying your email!';
    } catch (err) {
        let message;
        if (err instanceof AxiosError) {
            message = err.response?.data?.message;
        }
        return message || "Sorry! Couldn't Verify Your Email";
    }
};

export default VerifyEmailNotice;
