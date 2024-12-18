export interface Review {
    id?: number;
    userId: number;
    beerId: number;
    rate: number;
    comment: string;
    createdAt: Date;
}