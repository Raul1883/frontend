export type CharacterGet = {
  id: number;
  user_id: number;

  name: string;
  description: string;
  data_fields: Record<string, any>;
};

export type CharacterPost = {
  name: string;
  description: string;
  data_fields: Record<string, any>;
};
