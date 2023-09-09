"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchVector = void 0;
function searchVector(data) {
    const { queryVector, documents, top_k } = data;
    const results = new Array();
    const cosineSimilarity = (A, B) => {
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
    };
    for (let doc of documents) {
        results.push({
            similarity: cosineSimilarity(queryVector, doc[1].embedding),
            document: doc[1]
        });
    }
    results.sort((a, b) => b.similarity - a.similarity);
    return results.slice(0, top_k);
}
exports.searchVector = searchVector;
