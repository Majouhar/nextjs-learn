/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "username",
        mongodb_password: "password",
        baseUrl: "http://localhost:3000",
        NEXTAUTH_SECRET: "ASDASD",
        NEXTAUTH_URL:"http://localhost:3000"
      },
    };
  } else {
    return {
      env: {
        mongodb_username: "prod_username",
        mongodb_password: "prod_password",
        baseUrl: "http://localhost:3000",
        NEXTAUTH_SECRET: "ASDASD",
        NEXTAUTH_URL:"http://localhost:3000"
      },
    };
  }
};

module.exports = nextConfig;
