const { ApifyClient } = require('apify-client');

// Initialize the ApifyClient with API token
const client = new ApifyClient({
    token: 'apify_api_9iW8L1y9Pgha3iK6VNAeTcUZ4S9EXp2ATQrp',
});

// Prepare actor input
const input = {
    "searchStringsArray": [
        "chicken rice"
    ],
    "maxCrawledPlaces": 10,
    "language": "en",
    "maxImages": 0,
    "maxReviews": 0,
    "proxyConfig": {
        "useApifyProxy": true
    }
};

(async () => {
    // Run the actor and wait for it to finish
    const run = await client.actor("drobnikj/crawler-google-places").call(input);

    // Fetch and print actor results from the run's dataset (if any)
    console.log('Results from dataset');
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    items.forEach((item) => {
        console.dir(item);
    });
})();