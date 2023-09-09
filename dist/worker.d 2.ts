import { WorkerData } from './types';
export declare function searchVector(data: WorkerData): {
    similarity: number;
    document: import("./types").Document;
}[];
