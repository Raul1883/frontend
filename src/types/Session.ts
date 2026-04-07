export type SessionPost = {
  title: string;
  description: string;
  system_id: number;
  genre_id: number;
  company_id?: number;
  scheduled_at: string;
};

export type SessionGet = {
  id: number;
  title: string;
  description: string;
  scheduled_at: string;
  master: {
    id: number;
    login: string;
    contact_info: string;
    role: string;
  };
  system: {
    id: number;
    text: string;
  };
  genre: {
    id: number;
    text: string;
  };
  company?: {
    id: number;
    title: string;
    description?: string;
  };
};
