import { db } from "@/lib/prisma";

const restaurant = await db.restaurant.findUnique({
  where: { slug: "mcdonalds" },
});

if (!restaurant) {
  console.error("Restaurante não encontrado!");
}
