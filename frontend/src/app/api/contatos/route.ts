import { NextResponse } from "next/server";
import { mockContacts, wait } from "@/lib/mock-backend";

export async function GET() {
  await wait(700);

  return NextResponse.json(mockContacts);
}