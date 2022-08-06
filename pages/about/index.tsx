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
      <Paragraph><span>Materialism borrows its name from the philosophical doctrine which is generally understood to define all things in terms of their materiality.  We thought it a fitting title for a website about public art, though <Link href={{ pathname: '/artwork/times-square'}}>Max Neuhaus</Link> might disagree.</span></Paragraph>
      {/* <Paragraph><a>Materialism is not meant to be exhaustive; the works featured speak to us on aesthetic, historic or political levels.  Nor are the photos meant to be purely documentative.  If we approach these objects with a romantic impressionism it is because for us they are romantic.  They are objects of dreams and desires which interupt the strict rationality of the cityscape.</span></Paragraph> */}
      <Paragraph><span>All photos by Robert Girardin.</span></Paragraph>
      <Paragraph><span>Want to <Link href={{ pathname: '/contact/'}}>contact us</Link>?</span></Paragraph>
      <Paragraph><span>Want to suggest an artwork for Materialism?<div /><Link href={{ pathname: '/contact/form/'}}>Use this form.</Link></span></Paragraph>
      <Paragraph><span>Follow us on Instagram <a href='https://www.instagram.com/materialism.nyc/' target="_blank" rel="noopener noreferrer">@materialism.nyc</a></span></Paragraph>
      </AboutText>
      </Container>
    </Layout>
  )
}

const Container = styled.div`
width: 100%;
height: 100%;
max-width: 900px;
margin: 0 auto;
padding: 0 30px;
`

const AboutText = styled.div`
padding-top: 5vh;
font-size: 2rem;
text-align: center;
`

const Paragraph = styled.div`
padding-bottom: 1.2rem;
a {
  font-weight: 700;
}
`

export default about;