const sanityClient = require("@sanity/client")
const client = sanityClient({
  projectId: "mquooija",
  dataset: "production",
  token:
    "skmeYUwAwWByftWVAheyq955zKCgr001ln4FJj05MhH5I4Bn7H4Xt0RoFoR5jSh1JyTrz883sjD1omus9eZvmG8W3JYgxeaiM4k6DIiXPVnB6T08szhJdk6EifY3S5eF5haZf39LuVlbQtZtRs0l5ZDDlTvNVp5JPVrqitLtHAmMmgf870Ui", // or leave blank to be anonymous user
  useCdn: false, // `false` if you want to ensure fresh data
})

module.exports = client
