import { NextResponse } from "next/server";
import { getPortfolioStore, savePortfolioStore, PortfolioStoreData } from "@/lib/store";

const DEFAULT_ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "cyberlabs2026";

function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }
  try {
    const token = authHeader.replace("Bearer ", "");
    const decoded = Buffer.from(token, "base64").toString("utf8");
    return decoded.includes(DEFAULT_ADMIN_PASSCODE);
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeDrafts = searchParams.get("all") === "true";
    const store = getPortfolioStore();

    if (includeDrafts) {
      if (!isAuthorized(request)) {
        // Only return published items if unauthorized to view drafts
        return NextResponse.json({
          ...store,
          projects: store.projects.filter((p) => p.published !== false),
          experiences: store.experiences.filter((e) => e.published !== false),
          certificates: store.certificates.filter((c) => c.published !== false),
        });
      }
      return NextResponse.json(store);
    }

    // Public view: filter out draft items
    return NextResponse.json({
      ...store,
      projects: store.projects.filter((p) => p.published !== false),
      experiences: store.experiences.filter((e) => e.published !== false),
      certificates: store.certificates.filter((c) => c.published !== false),
    });
  } catch (error) {
    console.error("GET /api/portfolio error:", error);
    return NextResponse.json(
      { error: "Failed to load portfolio data" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const incomingData: Partial<PortfolioStoreData> = await request.json();
    const currentStore = getPortfolioStore();

    const updatedStore: PortfolioStoreData = {
      profile: incomingData.profile ? { ...currentStore.profile, ...incomingData.profile } : currentStore.profile,
      projects: incomingData.projects || currentStore.projects,
      experiences: incomingData.experiences || currentStore.experiences,
      certificates: incomingData.certificates || currentStore.certificates,
      skills: incomingData.skills || currentStore.skills,
      lastUpdated: new Date().toISOString(),
    };

    const success = savePortfolioStore(updatedStore);
    if (!success) {
      return NextResponse.json({ error: "Failed to write to portfolio store" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Portfolio data successfully synchronized",
      data: updatedStore,
    });
  } catch (error) {
    console.error("PUT /api/portfolio error:", error);
    return NextResponse.json({ error: "Failed to update portfolio data" }, { status: 500 });
  }
}
