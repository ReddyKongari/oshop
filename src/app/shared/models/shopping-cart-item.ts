import { AppProduct } from "./app-product";

export class ShoppingCartItem {
    uid: string;
    title: string;
    imageUrl: string;
    category: string;
    price: number;
    quantity: number;

    constructor(init?: Partial<ShoppingCartItem>) {
        Object.assign(this, init);
    }
    public get totalPrice() {
        return this.price * this.quantity;
    }
}