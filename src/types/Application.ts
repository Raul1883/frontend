export type ApplicationPost = {
  session_id: number;
  character_id: number;
  comment: string;
};

export type ApplicationGet = {
  id: number;
  user_id: number;
  session_id: number;
  character_id: number;
  comment: string;
  status: string
};

export type ApplicationCount = {
    count: number;
}
