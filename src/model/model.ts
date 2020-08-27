export interface Photo {
    id: string;
    owner: string;
    secret: string;
    server: string;
    farm: number;
    title: string;
    isPublic: number;
    isFriend: number;
    isFamily: number;
}