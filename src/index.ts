import fs from 'fs/promises'
import executeInThread from 'funthreads';
import { Embedding, Document, Documents } from './types';
import { createEmbedding } from './openai';
import { searchVector } from './worker';

class VectorDB {
    private documents: Documents;

    constructor() {
        this.documents = new Map();
    }

    async addText(text: string): Promise<Document | undefined> {
        const embedding = await createEmbedding(text)
        const id = (Math.floor(Math.random() * 10000) + 1).toString()
        this.documents.set(id, {
            id: id,
            embedding: embedding,
            metadata: {
                text: text
            }
        });

        return this.documents.get(id)
    }

    add(document: Document): Document | undefined {
        this.documents.set(document.id, document);
        return this.documents.get(document.id)
    }

    get(id: string): Document | undefined {
        return this.documents.get(id);
    }

    del(document: Document): void {
        this.documents.delete(document.id);
    }

    size(): number {
        return this.documents.size;
    }

    async loadFile(filename: string) {
        // TODO: handle exceptions
        const dataBuffer = await fs.readFile(filename)
        const documents = JSON.parse(dataBuffer.toString())

        for (let doc of documents) {
            this.add(doc)
        }
    }

    async dumpFile(filename: string) {
        // TODO: handle exceptions
        const jsonDump = JSON.stringify([...this.documents.values()])
        await fs.writeFile(filename, jsonDump)
    }

    async query(queryVector: Embedding, top_k: number=10) {
        const workerData = {
            queryVector: queryVector,
            documents: this.documents,
            top_k: top_k
        }

        const results = await executeInThread(searchVector, workerData);

        return results
    }

    async queryText(text: string, top_k: number=10) {
        const embedding = await createEmbedding(text)
        return this.query(embedding, top_k)
    }
}

export {
    Embedding,
    Document,
    VectorDB,
};