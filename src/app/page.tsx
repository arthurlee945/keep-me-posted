// import { authOptions } from "@/utils/auth/auth";
// import { getServerSession } from "next-auth";

export default async function Home() {
    // const session = await getServerSession(authOptions);
    return (
        <>
            <h1>Keep Me Posted</h1>
            {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
        </>
    );
}
