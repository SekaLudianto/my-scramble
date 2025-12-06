// utils/solver.ts
import fs from "fs";
import path from "path";

const VOWELS = new Set(["A", "E", "I", "O", "U"]);

export function removeDiacritics(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function loadCities() {
  const filePath = path.join(process.cwd(), "public/cities.ts");
  const text = fs.readFileSync(filePath, "utf8");

  const regex = /name:\s*"([^"]+)"\s*,\s*region:\s*"([^"]+)"/g;
  const cities: any[] = [];

  let match;
  while ((match = regex.exec(text)) !== null) {
    const original = match[1];
    const region = match[2];
    const simple = removeDiacritics(original).toUpperCase().replace(/\s+/g, "");

    cities.push({ original, region, simple });
  }

  return cities;
}

function isPossibleCity(scramble: string, city: string) {
  if (scramble.length !== city.length + 3) return false;

  const countS: Record<string, number> = {};
  const countC: Record<string, number> = {};

  for (const c of scramble) countS[c] = (countS[c] || 0) + 1;
  for (const c of city) countC[c] = (countC[c] || 0) + 1;

  for (const c in countC) {
    if ((countS[c] || 0) < countC[c]) return false;
  }

  const leftover: string[] = [];
  for (const c in countS) {
    const extra = countS[c] - (countC[c] || 0);
    for (let i = 0; i < extra; i++) leftover.push(c);
  }

  return leftover.length === 3 && leftover.every(c => VOWELS.has(c));
}

export function solve(scramble: string, cities: any[]) {
  const clean = removeDiacritics(scramble).toUpperCase().replace(/\s+/g, "");
  return cities.filter(city => isPossibleCity(clean, city.simple));
}
