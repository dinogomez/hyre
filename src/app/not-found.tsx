import { useSession } from "@/components/provider/session-provider";
import { getUser } from "@/lib/auth";
import { redirect, useRouter } from "next/navigation";

async function NotFoundPage() {
    const { user } = await getUser();

    return !user ? redirect("/") : redirect("/dashboard");
}
export default NotFoundPage;
