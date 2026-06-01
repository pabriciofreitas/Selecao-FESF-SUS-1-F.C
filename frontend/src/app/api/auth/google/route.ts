import { NextResponse } from "next/server";
import { mockUser, wait } from "@/lib/mock-backend";

export async function POST() {
  await wait(700);

  return NextResponse.json(mockUser);
}