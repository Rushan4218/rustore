import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export const middleware = async (req: NextRequest) => {
  const session = await auth();

  const authPages = ["/signin", "/signup", "/admin"];
  const { pathname } = req.nextUrl;
  const isAuthPage = authPages.some((page) => pathname === page);

  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }
};
