/**
 * @todo implement custom exception class
 * @see https://github.com/honojs/hono/blob/main/src/http-exception.ts
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
 */
import { load } from "./deps.ts";
import { PrismaClient } from "./generated/client/deno/edge.ts";
const env = await load();
console.log(env);

Deno.env.set("DATABASE_URL", "test");
const prisma = new PrismaClient();

async function main() {
  prisma.$connect();
  // ... you will write your Prisma Client queries here
  const allUsers = await prisma.agency.findFirst();
  console.log(allUsers);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    return false;
    // process.exit(1);
  });

export * from "./src/storage/mod.ts";
// export * from "./src/media/mod.ts";
// export * from "./src/notifications/email/mod.ts";

export function add(a: number, b: number): number {
  return a + b;
}
// https://docs.deno.com/runtime/tutorials/manage_dependencies
// Learn more at https://deno.land/manual/examples/module_metadata#concepts
// if (import.meta.main) {
//   console.log("Add 2 + 3 =", add(2, 3));
// }
