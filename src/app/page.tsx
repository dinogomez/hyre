import { getUser } from "@/lib/auth";
import Header from "./_components/header";
import HeroSection from "./_components/hero-section";

export default async function Home() {
    const { user } = await getUser();

    return (
        <div>
            <Header user={user} />
            <HeroSection />
        </div>
    );
}
