
  function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
    return dist;
}

export default function Distance(userlocation, artWorks){
	
	for (const [key, val] of Object.entries(artWorks)){
  let distance = getDistanceFromLatLonInKm(userlocation[0], 
  userlocation[1],val.location.lat,
  val.location.lng)
  //Attaching returned distance from function to array elements
  artWorks[key].distance = distance;
}
let sortedWorks = artWorks.sort((a,b) =>  (a.distance) - (b.distance));
return sortedWorks;
};