import { cookies } from "next/headers";

export const handleAuthLogout = async () => {
  const cookieStore = await cookies();
  cookieStore.getAll().forEach((cookie) => {
    cookieStore.delete(cookie.name);
  });
};
