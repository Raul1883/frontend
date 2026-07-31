export interface WikiRecord {
  id: string;
  title: string;
  slug: string;
  content: string;
  isFolder: boolean;
  created: string;
  updated: string;
}

export interface WikiRecordCreate {
  title: string;
  slug: string;
  content: string;
  isFolder: boolean;
}
