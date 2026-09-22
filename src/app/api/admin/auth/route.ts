import { NextResponse } from "next/server";

const DEFAULT_ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "cyberlabs2026";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { passcode } = body;

    if (!passcode) {
      return NextResponse.json(
        { success: false, message: "Passcode is required" },
        { status: 400 }
      );
    }

    if (passcode === DEFAULT_ADMIN_PASSCODE) {
      // Generate a simple token based on timestamp & secret
      const token = Buffer.from(`admin:${Date.now()}:${DEFAULT_ADMIN_PASSCODE}`).toString("base64");
      return NextResponse.json({
        success: true,
        token,
        message: "Authentication successful",
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid passcode" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Authentication failed" },
      { status: 500 }
    );
  }
}
