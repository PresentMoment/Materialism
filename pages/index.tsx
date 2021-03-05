import groq from "groq";
import client from '../client';
import Content from "../Components/Content/Content";
import Layout from '../Components/Layout'

const pageQuery = groq`
*[_type == 'artwork']{...,artist->{name}}`;


export default function Home(props) {
  let artWorks = props.props
  return (
    <>
      <Layout>
      <Content artWorks={props.props} />
        </Layout>
    </>
  );
}

Home.getInitialProps = async() => {
  const res = await client.fetch(pageQuery)
  return {
    props: res
  }
}