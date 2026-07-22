export type SessionPost = {
  title: string;
  description: string;
  scheduled_at: string;
  company: string;
  genre: string;
  system: string;
  master: string;
};

export interface ApplicationPayload {
  comment: string;
  expand: { user: { login: string; contact_info: string } };
}

export type SessionGet = {
  id: string;
  title: string;
  description: string;
  scheduled_at: string;
  company: string;
  genre: string;
  system: string;
  master: string;
  expand: {
    applications_via_session: ApplicationPayload[];
    company: {
      id: string;
      name: string;
      description?: string;
    };
    master: {
      id: string;
      login: string;
      contact_info: string;
      role: string;
    };
    system: {
      id: string;
      name: string;
    };
    genre: {
      id: string;
      name: string;
    };
  };
};
