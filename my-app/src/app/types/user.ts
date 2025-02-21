import IOrder from "./order";

export default interface IUser {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  credential: {
    id: number;
    password: string;
  };
  orders: IOrder[];
  role?:string;
}
