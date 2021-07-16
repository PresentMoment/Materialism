import React from 'react'
import Link from "next/link";
import styled from "styled-components"
import Layout from '../../Components/Layout';

function about({data = {}}) {

  return (
    <Layout>
      <Container>
      <AboutText>
      <Paragraph><span>Materialism is a tool for discovering public art in New York City.</span></Paragraph>
      <Paragraph><span>We believe in public spaces as both a relief from the commercial and predetermined uses of urban space, and as a platform for spontaneous interactions.  We believe that art can act as a catalyst for discovering and using these spaces.</span></Paragraph>
      <Paragraph><span>Materialism is not meant to be exhaustive; the works featured speak to us on aesthetic, historic or political levels.  Nor are the photos meant to be purely documentative.  If we approach these objects with a romantic impressionism it is because for us they are romantic.  They are objects of dreams and desires which interupt the strict rationality of the cityscape.</span></Paragraph>
      <Paragraph><span>All photos by <a href='http://robertgirardin.net/' target="_blank" rel="noopener noreferrer">Robert Girardin</a>.</span></Paragraph>
      <Paragraph><span>Want to send us feedback, report an issue or suggest an artwork?  <Link href={{ pathname: '/contact/'}}>Contact us</Link>.</span></Paragraph>
      <Paragraph><span>Follow us on Instagram <a href='https://www.instagram.com/materialism.nyc/' target="_blank" rel="noopener noreferrer">@materialism.nyc</a></span></Paragraph>
      </AboutText>
      </Container>
    </Layout>
  )
}

const Container = styled.div`
width: 100%;
height: 100%;
`

const AboutText = styled.div`
padding-top: 10vh;
font-size: 2rem;
margin-left: auto;
margin-right: auto;
width: 80vw;
text-align: center;
`

const Paragraph = styled.div`
padding-bottom: 1.2rem;
a {
  font-weight: 700;
}
`

export default about;