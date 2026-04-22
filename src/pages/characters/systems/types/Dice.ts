export const DICE_VALUES = [
  "d2",
  "d3",
  "d4",
  "d6",
  "d8",
  "d10",
  "d12",
  "d20",
] as const;

export const diceOptions = DICE_VALUES.map((value) => ({
  value,
  label: value, 
}));

export type Dice = (typeof DICE_VALUES)[number];
