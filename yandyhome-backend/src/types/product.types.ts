export interface Product {
    id?: string;
    name: string;
    description: string;
    category: string;
    price: number;
    inStock: boolean;
    imageUrl?: string | null; // <-- Accept null too
}
