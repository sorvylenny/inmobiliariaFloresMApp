export interface User {
   _id?: string;
   username: string;
   fullname?: string;
   password?: string;
   roles: string[];
   isActive?: boolean;
   token?: string;
}
