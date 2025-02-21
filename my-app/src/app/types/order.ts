import IProduct from "./product";

export default interface IOrder {
  id: number;
  status: string;
  date: string;
  products: IProduct[];
}
