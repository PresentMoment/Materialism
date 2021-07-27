import styled from "styled-components"
import Link from 'next/link';

import Layout from "../../Components/Layout"

export default function Form() {
  return (
    <Layout>
      <Container>
      <span>Thank you for your submission</span>
      <Spacer />
      <Link href={{ pathname: '/'}}>
        <a>
        <span>Go back to the homepage</span>
        </a>
      </Link>
      </Container>
    </Layout>
  )
}

const Container = styled.div`
text-align: center;
font-size: 2.3rem;
padding-top: 40px;
`

const Spacer = styled.div`
height: 40px;
`