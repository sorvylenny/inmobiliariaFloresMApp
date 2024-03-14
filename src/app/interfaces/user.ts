export interface User {
   _id?: string;
   username: string;
   fullname?: string;
   document?: string;
   email?: string;
   phoneNumber?: string;
   password?: string;
   roles: string[];
   isActive?: boolean;
   token?: string;
}
