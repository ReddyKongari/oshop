import { AppProduct } from "./app-product";

export class ShoppingCartItem {
    uid: string;
    title: string;
    imageUrl: string;
    category:string;
    price: number;
    quantity: number;
   
    public get totalPrice() {
        return this.price * this.quantity;
    }
}