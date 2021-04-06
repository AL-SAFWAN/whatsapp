import { Button } from "@material-ui/core";
import Head from "next/head";
import styled from "styled-components";

function Login() {
  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <LoginContainer>
        <Logo
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        />
        <Button variant ={'outlined'}>Sing In With Google</Button>
      </LoginContainer>
    </Container>
  );
}

export default Login;

const Container = styled.div`
display: grid;
place-items:center;
height:100vh;`;

const LoginContainer = styled.div`
display: flex;
flex-direction: column;
`;

const Logo = styled.img`
height:200px;
width:200px;
margin-bottom: 50px;

`;