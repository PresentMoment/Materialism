import React from 'react'
import styled from "styled-components"
import Layout from '../../Components/Layout';

function contact({data = {}}) {

  return (
    <Layout>
      <Container>
        <ContactText>
      <span>Find me fund ,e find me fjnd eme</span>
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
width: 10vw;
text-align: center;
`

export default contact;