import { NextResponse } from "next/server";
import { getAllFilms } from "@/app/utils/database";

export async function GET() {
  try {
    const films = await getAllFilms();
    return NextResponse.json({ films });
  } catch (error) {
    console.error("Error fetching films:", error);
    return NextResponse.json(
      { error: "Failed to fetch films" },
      { status: 500 }
    );
  }
}
