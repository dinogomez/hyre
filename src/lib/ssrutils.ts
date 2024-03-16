"use server";
import { redirect } from "next/navigation";
import { getUser } from "./auth";

export const protect = async (redirectPath = "/") => {};
