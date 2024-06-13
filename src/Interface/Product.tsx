export interface Product {
    id: number;
    img: string;
    title: string;
    price: number;
    rate: string;
    disc: number;
    category: string;
    sold: number;
    desc: string;
}

export interface Review {
    map(dtreview: (data: Review, i: number) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
    id: number;
    name: string;
    id_product: number;
    review: string;
    date: Date;
}

export interface SearchProduct {
    id: number;
    title: string;
}