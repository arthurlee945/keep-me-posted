import axios from "axios";
import { prisma } from "../database/prisma";

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
        console.log(err, "testestestest");
    }
};
