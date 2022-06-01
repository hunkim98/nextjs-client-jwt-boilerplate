/** @type {import('next').NextConfig} */

const serverDestination = process.env.API_URL + "/:path*";
//there should only be one module.exports
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    console.log(serverDestination);
    return [
      {
        source: "/api/:path*",
        destination: serverDestination, // Proxy to Backend
      },
      // {
      //   source: "/image/upload",
      //   destination: "https://image.simpledimpleworld.com/upload", // Proxy to Backend
      // },
    ];
  },
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  },
};
