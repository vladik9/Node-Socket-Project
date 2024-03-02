
const { MongoClient, ServerApiVersion } = require('mongodb');
const userName = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
//mongodb server connection link
const url = `mongodb+srv://${userName}:${password}@ctmeproject.lbtx1xs.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("\n##########################################");
    console.log("You successfully connected to MongoDB!");
    console.log("##########################################");

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
