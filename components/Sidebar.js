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

function Sidebar() {
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState(false);
  const channelName = useRef("");

  const handleClose = () => {
    setOpen(false);
  };
  const openChat = () => {};

  const addChat = () => {
    if (channelName.current === "") {
      alert("enter a channel name");
      return;
    }
    if (EmailValidator.validate(channelName.current)) {
      setErr(false);
      console.log("add chat", channelName.current);
    //   Add chat into the DB chat collection

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
        <UserAvatar />
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

const SidebarContainer = styled.div``;

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
