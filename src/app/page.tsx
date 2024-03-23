import { getUser } from "@/lib/auth";
import Header from "./_components/header";
import HeroSection from "./_components/hero-section";

export default async function Home() {
    const { user } = await getUser();

    return (
        <div>
            <Header user={user} />

            <div className="relative flex w-full  items-center justify-center bg-white bg-dot-black/[0.2] dark:bg-black dark:bg-dot-white/[0.2]">
                {/* Radial gradient for the container to give a faded look */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
                <div>
                    <HeroSection />
                </div>
            </div>
        </div>
    );
}
