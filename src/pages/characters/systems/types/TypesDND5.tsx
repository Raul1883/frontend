import type { Dice } from "./Dice";

export type Tabs = "stats" | "equipment" | "notes" | "spells";

// export const AbilityNameValues = [
//   "strength",
//   "dexterity",
//   "constitution",
//   "intelligence",
//   "wisdom",
//   "charisma",
// ] as const;
// export type AbilityName = (typeof AbilityNameValues)[number];

export interface Abilities {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface Skills {
  acrobatics: number;
  animalHandling: number;
  arcana: number;
  athletics: number;
  deception: number;
  history: number;
  insight: number;
  intimidation: number;
  investigation: number;
  medicine: number;
  nature: number;
  perception: number;
  performance: number;
  persuasion: number;
  religion: number;
  sleightOfHand: number;
  stealth: number;
  survival: number;
}

export interface ClassInfo {
  name: string;
  level: number;
  subclass?: string;
}



export interface CharacterSheet {
  name: string;
  race: string;
  class: ClassInfo;
  alignment?: string;
  inspiration?: boolean;
  background?: string;
  armorClass: number;
  initiative: number;
  speed: number;
  hitPoints: {
    maximum: number;
    current: number;
    temporary: number;
  };
  hitDice: {
    diceType: Dice;
    total: number;
    current?: number;
  };
  deathSaves?: {
    successes: number;
    failures: number;
  };

  abilities: Abilities;
  savingThrows: Abilities;
  skills: Skills;

  proficiencies: string;
  features: string;
  story: string;
  characters: string;
  locations: string;
  tasks: string;

  inventory: {
    weapon: string;
    armor: string;
    buff: string;
    questItems: string;
    other: string;
    currency: {
      cp: number;
      sp: number;
      gp: number;
      pp: number;
    };
  };
}


export interface Spell {
  name: string;
  level: number;
  school?: string;
  castingTime?: string;
  range?: string;
  components?: string;
  duration?: string;
  description: string;
  prepared?: boolean;
  ritual?: boolean;
  concentration?: boolean;
}

  // spellcasting?: {
  //   spellcastingAbility: AbilityName;
  //   spellSaveDC: number;
  //   spellAttackBonus: number;
  //   slots: Record<number, { total: number; used: number }>;
  //   spells: Spell[];
  // };