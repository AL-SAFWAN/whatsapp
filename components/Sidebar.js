import { Avatar, Button, IconButton } from "@material-ui/core";
import { ChatRounded, Email, MoreVert, Search } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useRef, useState } from "react";
import styled from "styled-components";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";

function Sidebar() {
  const [user] = useAuthState(auth);
  const userCharRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatSnapshot] = useCollection(userCharRef);

  const [open, setOpen] = useState(false);
  const [err, setErr] = useState(false);
  const channelName = useRef("");

  const handleClose = () => {
    setOpen(false);
  };
  const openChat = () => {};

  const addChat = () => {
    const chatAlreadyExists = (recipientEmail) =>
      !!chatSnapshot?.docs.find(
        (chat) =>
          chat.data().users.find((user) => user === recipientEmail)?.length > 0
      );

    if (channelName.current === "") {
      alert("enter a channel name");
      return;
    }
    if (
      EmailValidator.validate(channelName.current) &&
      channelName.current !== user.email &&
      !chatAlreadyExists(channelName.current)
      // if the chat already exists and the user doesn't already exists and valid
    ) {
      setErr(false);
      db.collection("chats").add({
        users: [user.email, channelName.current],
      });
    } else {
      setErr(true);
      return;
    }

    setOpen(false);
    channelName.current = "";
  };

  return (
    <SidebarContainer>
      {open && (
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Start A Chat</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter an email address for the user you wish to chat with
              </DialogContentText>
              <TextField
                error={err}
                autoFocus
                margin="dense"
                id="name"
                label={err ? "Incorrect Format" : "Email Address"}
                type="email"
                fullWidth
                onChange={(e) => (channelName.current = e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={addChat} color="primary">
                add
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
      <Header>
        <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />
        <IconContainer>
          <IconButton>
            <ChatRounded />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </IconContainer>
      </Header>
      <SearchContainer>
        <Search />
        <SearchInput placeholder="Search for Chats" />
      </SearchContainer>
      <SideBarButton
        onClick={() => {
          setOpen(true);
        }}
      >
        Start A New Chat
      </SideBarButton>
      {/* List of chats */}
      {chatSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </SidebarContainer>
  );
}

export default Sidebar;
const SideBarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;

const SidebarContainer = styled.div`
flex: 0.45;
border-right: 1px solid whitesmoke;
height: 100vh;
min-width: 300px;
max-width: 350px;
overflow-y:scroll;
::-webkit-scrollbar{
  display:none;
}
-ms-overflow-style: none;
scrollbar-width: none;
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;
const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const IconContainer = styled.div``;
