/* mySeedScript.js */

// require the necessary libraries
const faker = require("faker");
const MongoClient = require("mongodb").MongoClient;

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function seedDB() {
    // Connection URL
    const uri = process.env.MONGO_DB;

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log("Connected correctly to server");

        const collection = client.db("text").collection("products");

        // The drop() command destroys all data from a collection.
        // Make sure you run it against proper database and collection.
        collection.drop();

        // make a bunch of time series data
        let timeSeriesData = [];

        for (let i = 0; i < 50; i++) {
        
const             name = faker.random.word();

const description = faker.lorem.paragraph();
const price = faker.commerce.price();
const reviews = faker.random.number();
const images = faker.random.arrayElement();
const addedBy = faker.random.number()
const category = faker.random.arrayElement();
const tag = faker.random.arrayElement();
const sale = faker.random.number();



            let product = {
                name: name,
                description: description,
                price: price,
                reviews: reviews,
                images: images,
                addedBy: addedBy,
                category: category,
                tag: tag,
                sale: sale,
            };

            for (let j = 0; j < randomIntFromInterval(1, 6); j++) {
                let newEvent = {
                    timestamp_event: faker.date.past(),
                    weight: randomIntFromInterval(14,16),
                }
                newDay.events.push(newEvent);
            }
            timeSeriesData.push(newDay);
        }
        collection.insertMany(timeSeriesData);

        console.log("Database seeded! :)");
        client.close();
    } catch (err) {
        console.log(err.stack);
    }
}

seedDB();