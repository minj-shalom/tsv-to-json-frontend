import { ENV_REST_API_PROTOCOL, ENV_REST_API_URL } from "../common/constant";

export default function validateEnv() {
  if (ENV_REST_API_PROTOCOL !== "http" && ENV_REST_API_PROTOCOL !== "https") {
    throw new Error("process.env.REACT_APP_REST_API_PROTOCOL is not valid.");
  }
  if (!ENV_REST_API_URL) {
    throw new Error("process.env.REACT_APP_REST_API_URL is not valid.");
  }
}
