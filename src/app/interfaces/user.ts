export interface User {
  idUser?: string;
   username: string;
   fullname?: string;
   password?: string;
   roles: string[];
   isActive?: boolean;
   token?: string;
}
