import styled from "styled-components"

import { useForm } from "../../Utils/useForm";

export default function SuggestForm() {

  const {
    handleSubmit,
    handleChange,
    data,
    errors,
  } = useForm({
    onSubmit: () => console.log('submitted')
  });

  return (
    <section>
      <div>
          <Container>
            <Heading>Is there an artwork you would like to see on Materialism?</Heading><div />
            <Sub>Please, let us know:</Sub>
            <Spacer />
            <Form
              onSubmit={handleSubmit}
              name="suggest"
              data-netlify="true"
            >
              <input type="hidden" name="form-name" value="suggest" />
                <label>
                  <Input type="text" name="title" onChange={handleChange('title')} placeholder="Artwork Title (optional)" />
                </label>
              <Sub>Enter an address for the work; or paste in a Google Maps link to the work:</Sub>
              <label>
                <Input type="text" name="address" onChange={handleChange('address')} placeholder="Address" />
              </label>
              <label>
                <Input type="url" name="map-link" onChange={handleChange('map-link')} placeholder="Google Maps Link" />
              </label>
                <label>
                  <Input type="name" name="name" onChange={handleChange('name')} placeholder="Your Name (optional)" />
                </label>
                <label>
                  <Input type="email" name="email" onChange={handleChange('email')} placeholder="Your Email (optional)" />
                </label>
                <label>
                  <Comments type="text" name="comments" onChange={handleChange('comments')} placeholder="Anything else you would like to say" />
                </label>
                <Button type="submit">SUBMIT</Button>
            </Form>
          </Container>
      </div>
    </section>
  );
}

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding-top: 20px;
`

const Form = styled.form`
display: flex;
flex-direction: column;
width: 80vw;
`

const Input = styled.input`
border: none;
background-color: #efefef;
height: 3rem;
margin: 10px 0;
width: 100%;
font-family: 'CormorantGaramond' !important;
::placeholder,
::-webkit-input-placeholder {
  color: #7c7c7c;
}
:-ms-input-placeholder {
   color: #7c7c7c;
}
`

const Comments = styled.input`
border: none;
background-color: #efefef;
padding-bottom: 250px;
margin: 10px 0;
width: 100%;
font-family: 'CormorantGaramond' !important;
::placeholder,
::-webkit-input-placeholder {
  color: #7c7c7c;
}
:-ms-input-placeholder {
   color: #7c7c7c;
}
`

const Button = styled.button`
border: 1px solid #7c7c7c;
border-radius: 1px;
padding: 5px 0;
background-color: #efefef;
`

const Spacer = styled.div`
height: 10px;
`

const Heading = styled.span`
font-size: 1.8rem;
padding-bottom: 14px;
`

const Sub = styled.span`
font-size: 1.3rem;
`