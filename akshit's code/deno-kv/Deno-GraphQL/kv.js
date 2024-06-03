import { load } from "https://deno.land/std@0.220.0/dotenv/mod.ts";

const env = await load();
const UUID = env.UUID;

const KV = await Deno.openKv(
  `https://api.deno.com/databases/${UUID}/connect`,
);

export async function addStudent(data) {
  const key = ["student", data.class, data.rollno];
  return KV.set(key, data);
}

export async function getStudent(classname, rollno) {
  const key = ["student", classname, rollno];
  return (await KV.get(key)).value;
}

export async function delStudent(classname, rollno) {
  const key = ["student", classname, rollno];
  return KV.delete(key);
}

export async function updateStudent(data) {
  const key = ["student", data.class, data.rollno];
  return KV.set(key, data).value;
}

export async function listStudent(prefix) {
  const data = KV.list({ prefix: prefix });
  for await (const entry of data) {
    console.log(entry);
  }
  return KV.list({ prefix: prefix });
}

// const studentData = {
//   name: "Saumya",
//   age: 10,
//   address: "India",
//   rollno: 41,
//   gender: "Male",
//   class: "class-B",
// };

// const updateData = {
//   name: "Saumya",
//   age: 12,
//   address: "India",
//   rollno: 4,
//   gender: "Male",
//   class: "class-B",
// };

// const className = "class-B";
// const rollno = 4;

// addStudent(studentData);

// const data = await getStudent(className, rollno);
// console.log(data);

// delStudent(className, rollno);

// updateStudent(updateData);

// await listStudent(["student"]);
