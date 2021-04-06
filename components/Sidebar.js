import { Avatar, Button, IconButton } from "@material-ui/core";
import { ChatRounded, MoreVert, Search } from "@material-ui/icons";
import styled from "styled-components";
function Sidebar() {
  return (
    <SidebarContainer>
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
      <SideBarButton>Start A New Chat</SideBarButton>
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
