import { Address } from "./address";

export interface User {
    user_id:number,
    email:string,
    first_name:string,
    last_name:string,
    address: Address;
    departmentCode: string;
    role:string
}
