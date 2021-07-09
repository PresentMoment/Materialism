import React from 'react'
import styled from "styled-components"
import Layout from '../../Components/Layout';

function about({data = {}}) {

  return (
    <Layout>
      <Container>
      <AboutText>
      <span>Materialism </span>
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
width: 10vw;
text-align: center;
`
export default about;