export interface Beer {
    id?: number;
    breweryId: number;
    categoryId: number;
    name: string;
    description: string;
    abv: number;
    ibu: number;
}