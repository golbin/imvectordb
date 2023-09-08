# In-memory VectorDB

Super simple in-memory vector DB for Node.js

You can use this to make prototypes or small products in Node.js fast.

## Installation

```sh
npm install imvectordb
```

## Usage

Please check "samples" folder and types.

```typescript
import { VectorDB } from 'imvectordb';

const db = new VectorDB();

// Add a document
db.add({
    id: "1",
    embedding: [0.014970540, ...],
    metadata: {
        text: "original text",
        ... // anything
    }
})

// Search documents, top_k=10
const queryVector = [0.014970540, ...]
const searchResults = await db.query(queryVector, 10)

searchResults[0].similarity
searchResults[0].document.id
searchResults[0].document.embedding
searchResults[0].document.metadata.text

// You can also use like this to make prototypes super simple.
// It use OpenAI's "text-embedding-ada-002" model to embed automatically
// So you need to set "OPENAI_API_KEY" environment value
db.addText("add vector with only text")
db.queryText("search text here", 3)

// Get, Delete a document
db.get("1")
db.del("1")

// Dump and Load from file
db.dumpFile("filename.json")
db.loadFile("filename.json")

// terminate worker to finish running process
db.terminateWorker();
```

## License

MIT