import styled from "styled-components";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";

function Message({ user, message }) {
  const [userLoggedIn] = useAuthState(auth);
  const TypeOfMessage = user === userLoggedIn.email ? Sender : Receiver;
  return (
    <Container>
      <TypeOfMessage>
        {message.message}
        <Timestamp>
          {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
        </Timestamp>
      </TypeOfMessage>
    </Container>
  );
}

export default Message;

const Container = styled.div``;

const MessageElement = styled.p`
  width: fit-content;
  padding: 8px 10px 25px 10px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  position: relative;
`;

const Sender = styled(MessageElement)`
  margin-left: auto;
  text-align: right;
  background-color: #dcf8c6;
`;
const Receiver = styled(MessageElement)`
  background-color: whitesmoke;
  text-align: left;
`;

const Timestamp = styled.span`
  color: grey;
  padding: 7.5px;
  font-size: 9px;
  position: absolute;
  bottom: 0;
  text-align: center;
  right: 0;
`;
