// Client-side logout function
export const handleClientLogout = () => {
  // Clear all cookies by setting them to expire
  const cookies = document.cookie.split("; ");
  cookies.forEach((cookie) => {
    const cookieName = cookie.split("=")[0];
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
};
