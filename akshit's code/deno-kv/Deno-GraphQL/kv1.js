import { load } from "https://deno.land/std@0.220.0/dotenv/mod.ts";

const env = await load();
const UUID = env.UUID;

const KV = await Deno.openKv(
  `https://api.deno.com/databases/${UUID}/connect`,
);

// const key = ['student','Akshit'];
// const value = 22;
// await KV.set(key,value);

// const key = ['student','Akshit'];
// const data = await KV.get(key)
// console.log(data)

// const key = ['student','Akshit'];
// await KV.delete(key)

const data = await KV.list({ prefix: ["student"] });
for await (const entry of data) {
  console.log(entry);
}
