export const NODE = process.env.NODE_ENV || "development";
export const IS_PRODUCTION = NODE === "production";
export const PORT = process.env.PORT || 4444;

if (!IS_PRODUCTION) {
  require("dotenv").config();
}

export const EXAMPLE = process.env.EXAMPLE;
