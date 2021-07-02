const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: "mquooija",
  dataset: "production",
  apiVersion: "2021-07-01",
  token: "", // or leave blank to be anonymous user
  useCdn: true, // `false` if you want to ensure fresh data
})

module.exports = client
