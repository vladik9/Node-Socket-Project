
const { MongoClient, ServerApiVersion } = require('mongodb');
const userName = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
// const uri = "mongodb+srv://ctmeUser:<password>@ctmeproject.lbtx1xs.mongodb.net/?retryWrites=true&w=majority";
const url = `mongodb+srv://${userName}:${password}@ctmeproject.lbtx1xs.mongodb.net/?retryWrites=true&w=majority`;
console.log(url);

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
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
