import HeadPreloads from "../Components/HeadPreloads";
import Header from "../Components/Header/Header";
import Content from "../Components/Content/Content";
import Footer from "../Components/Footer/Footer";

export default function Home(props) {
  return (
    <>
      <HeadPreloads />
      <Header />
      <Content {...props} />
      <Footer />
    </>
  );
}

const address = "337 E 86th St, New York, NY, 10028"


export async function getInitialProps() {
  const request = await fetch(`http://open.mapquestapi.com/geocoding/v1/address?key=${process.env.MAPQUEST_KEY}&location=${address}`)
  const result = request.json()
  return {
    props: {...result} ,
  }
}