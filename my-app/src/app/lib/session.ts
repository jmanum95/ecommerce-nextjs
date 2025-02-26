import { cookies } from "next/headers";
import "server-only";

export async function createSession(token: string) {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); //1 day

  (await cookies()).set("session", token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}
