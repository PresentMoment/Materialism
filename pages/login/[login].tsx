import Layout from "../../Components/Layout";
import styled from "styled-components"

export default function LogIn (){
  return(
    <Layout>
      <Wrapper>
        <LoginForm>
      <span>Email</span>
      <span>Password</span>
        </LoginForm>
      </Wrapper>
    </Layout>
  );
}

const Wrapper  = styled("div")`
display: flex;
flex-direction: column;
justify-content: center;
height: 100%;
`

const LoginForm = styled("div")`
display: flex;
flex-direction: column;
border: 1px solid black;
margin: 0 auto;
width: 60vw;
font-size: 3em;
padding: 20px 20px;
`