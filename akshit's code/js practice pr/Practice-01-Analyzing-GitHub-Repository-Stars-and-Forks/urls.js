import { load } from "https://deno.land/std@0.217.0/dotenv/mod.ts";

const userAPI = "https://api.github.com/users";
const repoAPI = "https://api.github.com/repos";

const env = await load();
const TOKEN = env.GITHUB_TOKEN;

export { repoAPI, TOKEN, userAPI };
