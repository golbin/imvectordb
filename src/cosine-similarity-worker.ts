import { parentPort } from 'worker_threads';
import { Document, WorkerData, WorkerResult } from './types';

function cosineSimilarity(A: number[], B: number[]): number {
    let dotproduct = 0;
    let mA = 0;
    let mB = 0;

    for(let i = 0; i < A.length; i++) {
        dotproduct += A[i] * B[i];
        mA += A[i] * A[i];
        mB += B[i] * B[i];
    }

    mA = Math.sqrt(mA);
    mB = Math.sqrt(mB);

    return dotproduct / (mA * mB);
}

parentPort?.on('message', (data: WorkerData) => {
    const { id, queryVector, documents, top_k } = data;
    const results = new Array()

    for (let doc of documents) {
        results.push({
            similarity: cosineSimilarity(queryVector, doc[1].embedding),
            document: doc[1] 
        })
    }

    results.sort((a: { similarity: number; }, b: { similarity: number; }) => b.similarity - a.similarity);

    parentPort?.postMessage({ id, results: results.slice(0, top_k) } as WorkerResult);
});
