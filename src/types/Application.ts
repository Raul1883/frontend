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
  status: string;
};

export interface ApplicationViaSession {
  character: string;
  comment: string;
  session: string;
  user: "8l4verotoy9h5dd";
}

export type ApplicationDataItem = {
  expand: {
    user: {
      login: string;
      contact_info: string;
    };
  };
  comment: string;
};
