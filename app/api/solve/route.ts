// app/api/solve/route.ts
import { loadCities, solve } from "@/utils/solver";

export async function POST(req: Request) {
  const { scramble } = await req.json();

  const cities = loadCities();
  const result = solve(scramble, cities);

  return Response.json(result);
}
