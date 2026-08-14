import {
  PROBABILITY_MATRIX,
  DURABILITY_MAP,
  disadvantages,
  advantages,
} from "./const";
import type { GenFormData, Properies } from "./types";

/** Выбор элемента с заданными весами (аналог random.choices) */
function weightedRandom<T>(items: T[], weights: number[]): T {
  const total = weights.reduce((acc, w) => acc + w, 0);
  let rand = Math.random() * total;
  for (let i = 0; i < items.length; i++) {
    rand -= weights[i];
    if (rand <= 0) {
      return items[i];
    }
  }
  return items[items.length - 1];
}

/** Перемешивание массива (Fisher–Yates) для выборки без повторений */
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Взять N случайных уникальных элементов из массива */
function sampleN<T>(array: T[], n: number): T[] {
  if (n <= 0) return [];
  const shuffled = shuffle(array);
  return shuffled.slice(0, Math.min(n, shuffled.length));
}

export const generateWeapon = ({ lvl, name }: GenFormData) => {
  const options = PROBABILITY_MATRIX[lvl];
  const qualities = Object.keys(options);
  const weights = Object.values(options);

  const chosenQuality = weightedRandom(qualities, weights);
  const durability = DURABILITY_MAP[chosenQuality];

  let properties: Properies[] = [];

  if (chosenQuality.includes("2 недостатка")) {
    properties = sampleN(disadvantages, 2);
  } else if (chosenQuality.includes("1 недостаток")) {
    properties = sampleN(disadvantages, 1);
  } else if (chosenQuality.includes("2 преимущества")) {
    properties = sampleN(advantages, 2);
  } else if (chosenQuality.includes("1 преимущество")) {
    properties = sampleN(advantages, 1);
  }
  // "Среднее" – остаётся пустым

  return {
    quality: chosenQuality,
    durability,
    properties,
    name,
  };
};
