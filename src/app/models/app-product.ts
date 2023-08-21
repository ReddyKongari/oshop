import { DecimalPipe } from "@angular/common";

export interface AppProduct {
    category: string;
    imageUrl: string;
    price: DecimalPipe;
    title:string;
}