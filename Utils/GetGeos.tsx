import client from '../client';

export default function getGeos(artWorks){
  const geosToConvert = []
  const getGeos = () => {
    for(const [index, data] of artWorks.entries()){
      if (!data.address){
        geosToConvert.push({_id: data._id, lat: data.location.lat,lng: data.location.lng})
      }
    }
  }
  getGeos();


  const locales = []
  async function forLoop(geo) {
    await fetch(
      `https://geoservices.tamu.edu/Services/ReverseGeocoding/WebService/v04_01/HTTP/default.aspx?apiKey=0c97418cf2f248d697f537d32c5f9734&version=4.01&lat=${geo.lat}&lon=${geo.lng}&format=json`    )
      .then((response) => response.json())
      .then((result) => {
        client
          .patch(geo._id)
          .set({address: result.StreetAddresses[0].StreetAddress + ', ' + result.StreetAddresses[0].City + ', ' + result.StreetAddresses[0].State + ', ' + result.StreetAddresses[0].Zip})
          .commit()
          .then((updatedArt) => {
            return;
          })
          .catch((err) => {
            console.error(err.message)
          })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const arrayOfPromises = [];
  geosToConvert.forEach((geo) => {
    arrayOfPromises.push(forLoop(geo))
  })

    Promise.all(arrayOfPromises).then(() => {
      return;
    })
  }