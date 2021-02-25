import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

export default function Layout(props) {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
