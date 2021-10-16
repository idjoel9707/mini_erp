const redis = require("redis")
const client = redis.createClient()

async function cache(req, res, next) {
    console.log("Fetching data...")
    try {
        client.get(token.id + " " + req.originalUrl, async (error, response) => {
            if (error) throw error;
            if(response) {
                console.log("User retrieved data from Cache")
                return res.status(200).send(JSON.parse(response))
            } else {
                console.og("User retrieved data from API")
                next()
            }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { cache }