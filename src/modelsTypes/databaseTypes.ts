import * as Hapi from "@hapi/hapi";
export type User = {
  id: string;
  username: string;
  password: string;
  created_at: Date;
  updated_at: Date;
};

