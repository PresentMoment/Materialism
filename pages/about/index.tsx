import React from 'react'
import styled from "styled-components"
import Layout from '../../Components/Layout';

function about({data = {}}) {

  return (
    <Layout>
      <Container>
      <AboutText>

      <span>I started this site as a blah bhahb bha bhbhdhb bhdhbd hbhdhb dhfhbhd fhbhd fhbhdhf bhdhf bhdhf  hh h hdfhib dhfh hf fhhf bvvhd ih fhf hifhif fhfh bfhfh fhf hf fhfh d</span>
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