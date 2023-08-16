import type { Metadata } from "next";

type Props = {};
export const metadata: Metadata = {
    title: "Keep Me Posted | About Page",
    description: "Keep Me Post utilizes nextjs to help you keep track of your packages and allows you to keep track of them",
};
const AboutPage = (props: Props) => {
    return <main className="flex-1">AboutPage</main>;
};

export default AboutPage;
