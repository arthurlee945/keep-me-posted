import axios from 'axios';
import { NextResponse } from 'next/server';
import qs from 'qs';
type RecaptchaRequestType = {
  token: string;
};

const GOOGLE_RECAPTCHA_URL = 'https://www.google.com/recaptcha/api/siteverify';
export async function POST(req: Request) {
  const { token } = (await req.json()) as RecaptchaRequestType;

  if (!token || !process.env.RECAPTCHA_SECRET_KEY)
    return new NextResponse(
      JSON.stringify({ status: 'failed', message: 'Token or Key is invalid' }),
      { status: 400 }
    );

  const query = qs.stringify({
    secret: process.env.RECAPTCHA_SECRET_KEY,
    response: token,
  });

  try {
    const verificationRes = (
      await axios.post(`${GOOGLE_RECAPTCHA_URL}?${query}`)
    ).data;
    if (verificationRes?.score > 0.5) {
      return NextResponse.json({
        status: 'successful',
        message: 'Validation succeeded as human',
      });
    } else {
      return NextResponse.json({
        status: 'failed',
        message: 'Validation failed as bot',
      });
    }
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        status: 'failed',
        message: 'Sorry something went wrong',
      }),
      { status: 500 }
    );
  }
}
