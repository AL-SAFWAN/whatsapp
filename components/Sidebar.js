import { Avatar, IconButton } from "@material-ui/core";
import { ChatRounded, MoreVert } from "@material-ui/icons";
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
    </SidebarContainer>
  );
}

export default Sidebar;

const SidebarContainer = styled.div``;
const Header = styled.div`
display:flex;
position:sticky;
top: 0;
background-color:white;
z-index:1;
justify-content: space-between;
align-items: center;
padding:15px;
height:80px;
border-bottom: 1px solid whitesmoke;

`;
const UserAvatar = styled(Avatar)`
cursor: pointer;
:hover{
    opacity:0.8;
    
}
`;

const IconContainer = styled.div``;
