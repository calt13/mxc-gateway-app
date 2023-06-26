import type { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
  api: {
    responseLimit: "16mb",
  },
};

export default async function handler(req: NextRequest) {
  const reqUrl = new URL(req.url);
  const mxcUri = reqUrl.searchParams.get("uri");
  if (!mxcUri) {
    return new Response("mxc URI should not be blank", { status: 400 });
  }

  const serverUrl = `https://${mxcUri.substring(
    6,
    mxcUri.lastIndexOf("/")
  )}/_matrix/media/r0/`;
  console.log(serverUrl);
  // || process.env.MATRIX_SERVER_URL;
  const downloadUrl = `${serverUrl}/download/${mxcUri.substring(6)}`;

  return await fetch(downloadUrl);
}
