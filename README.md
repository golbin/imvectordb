# In-memory VectorDB

Super simple and easy-to-use in-memory vector DB for Node.js

Perfect for quickly building prototypes or small-scale applications in Node.js.

With a compressed (ZIP) file size of just 3KB.

## Installation

```sh
npm install imvectordb
```

## Usage

Easily integrate it into your project with just a few lines of code:

```typescript
import { VectorDB } from 'imvectordb';

const db = new VectorDB();

db.addText("text for semantic search")
// ...add additional text as needed

db.queryText("text to search")
```

This library automatically uses OpenAI's "text-embedding-ada-002" model for embedding, so you'll need to set the `OPENAI_API_KEY` environment variable.

You can also add documents to the database using your own embedding models.

Here's a complete guide:

```typescript
import { VectorDB } from 'imvectordb';

const db = new VectorDB();

// Add a new document to the database
db.add({
    id: "1",
    embedding: [0.014970540, ...],
    metadata: {
        text: "original text",
        ... // additional metadata
    }
})

// Perform a search and retrieve the top 10 similar documents
const queryVector = [0.014970540, ...]
const searchResults = await db.query(queryVector, 10)

// Access search result details
searchResults[0].similarity
searchResults[0].document.id
searchResults[0].document.embedding
searchResults[0].document.metadata.text

// Retrieve or delete a document by its ID
db.get("1")
db.del("1")

// Save to or load from a file
db.dumpFile("filename.json")
db.loadFile("filename.json")

// Terminate the Worker when it's no longer needed or when the server closes
db.terminate()
```

For more examples, please check the "samples" folder and the available types.

## Performance

Use up to 10,000 documents; going over is not recommended. A few thousand is ideal.

There's significant room for performance improvement. Patches and PRs are welcome.

```
Machine: MackBook Air M2
Dimensions: 1,536 (text-embedding-ada)

----------
Search in 100 documents, 10 times.
----------
Total: 57.577ms
Average: 5.758ms

----------
Search in 1000 documents, 10 times.
----------
Total: 541.979ms
Average: 54.198ms

----------
Search in 10000 documents, 10 times.
----------
Total: 13430.621ms
Average: 1343.062ms
```

## Family

- [LLM Chunk](https://github.com/golbin/llm-chunk)
  - Super simple and easy-to-use text splitter for Node.js

## License

MIT