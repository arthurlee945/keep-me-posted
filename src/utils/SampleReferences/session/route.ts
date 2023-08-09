// import { authOptions } from "@/utils/auth/auth";
// import { getServerSession } from "next-auth";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//     const session = await getServerSession(authOptions);
//     if (!session)
//         return new NextResponse(JSON.stringify({ status: "fail", message: "You are not logged in" }), {
//             status: 401,
//             statusText: "Not Authorized - Please Sign In",
//         });
//     return NextResponse.json({
//         authenticated: !!session,
//         session,
//     });
// }
