import dotenv from "dotenv";

export default function loadEnvs() {
  const path =
    process.env.NODE_ENV === "test" ? ".env.test" : ".env.development";
    
  dotenv.config({ path });
}
