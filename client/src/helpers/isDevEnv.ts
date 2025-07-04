export const isDev = process.env.NODE_ENV === "development";
export const isProd = process.env.NODE_ENV === "production";

export const isProdEnv = process.env.NEXT_PUBLIC_NODE_ENV === "PRODUCTION";
export const isBetaEnv = process.env.NEXT_PUBLIC_NODE_ENV === "PREVIEW";
