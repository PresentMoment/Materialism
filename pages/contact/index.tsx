import Link from 'next/link';
import React from 'react'
import styled from "styled-components"
import Layout from '../../Components/Layout';

function contact({data = {}}) {

  return (
    <Layout>
      <Container>
        <ContactText>
      <span><a href="mailto:info@materialism.nyc" target="_blank" rel="noopener noreferrer">info@materialism.nyc</a></span>
      <div />
      <span><a href='https://www.instagram.com/materialism.nyc/' target="_blank" rel="noopener noreferrer">Instagram: @materialism.nyc</a></span>
      <div />
      <span><a href='https://www.are.na/robert-girardin/public-areas' target="_blank" rel="noopener noreferrer">our Are.na channel</a></span>
      <Spacer />
      <span>Want to suggest an artwork for Materialism?<div /><Link href={{ pathname: '/contact/form/'}}>Use our suggestion form</Link></span>
        </ContactText>
      </Container>
    </Layout>
  )
}

const Container = styled.div`
width: 100%;
height: 100%;
`

const ContactText = styled.div`
padding-top: 10vh;
font-size: 2rem;
margin-left: auto;
margin-right: auto;
width: 80vw;
text-align: center;
line-height: 4rem;
`

const Spacer = styled.div`
height: 80px;`

export default contact;