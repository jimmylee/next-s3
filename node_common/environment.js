export const NODE = process.env.NODE_ENV || "development";
export const IS_PRODUCTION = NODE === "production";
export const PORT = process.env.PORT || 4444;

if (!IS_PRODUCTION) {
  require("dotenv").config();
}

export const IAM_USER_KEY = process.env.IAM_USER_KEY;
export const IAM_USER_SECRET = process.env.IAM_USER_SECRET;
export const BUCKET_NAME = process.env.BUCKET_NAME;
