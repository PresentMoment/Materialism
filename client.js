const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: "mquooija",
  dataset: "production",
  apiVersion: "2021-07-01",
  token: process.env.SANITY_WRITE_TOKEN, // or leave blank to be anonymous user
  useCdn: false, // `false` if you want to ensure fresh data
})

module.exports = client
