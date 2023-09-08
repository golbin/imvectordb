"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
function cosineSimilarity(A, B) {
    let dotproduct = 0;
    let mA = 0;
    let mB = 0;
    for (let i = 0; i < A.length; i++) {
        dotproduct += A[i] * B[i];
        mA += A[i] * A[i];
        mB += B[i] * B[i];
    }
    mA = Math.sqrt(mA);
    mB = Math.sqrt(mB);
    return dotproduct / (mA * mB);
}
worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.on('message', (data) => {
    const { id, queryVector, documents, top_k } = data;
    const results = new Array();
    for (let doc of documents) {
        results.push({
            similarity: cosineSimilarity(queryVector, doc[1].embedding),
            document: doc[1]
        });
    }
    results.sort((a, b) => b.similarity - a.similarity);
    worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage({ id, results: results.slice(0, top_k) });
});
