import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

async function NotFoundPage() {
    const { user } = await getUser();

    return !user ? redirect("/") : redirect("/dashboard");
}
export default NotFoundPage;
