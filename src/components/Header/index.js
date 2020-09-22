import React from "react";
import { useDispatch } from "react-redux";

import { TopBar, TopBarSection, TopBarTitle, Button } from "@duik/it";
import { LogoutOutlined } from "@ant-design/icons";
import { userLogOutRequest } from "../../actions/user";

import "./styles.scss";

const Header = (props) => {
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    await dispatch(userLogOutRequest());
    props.history.push('/login');
  };
  return (
    <TopBar {...props}>
      <TopBarSection>
        <TopBarTitle large>Dashboard</TopBarTitle>
      </TopBarSection>
      <TopBarSection>
        <Button primary onClick={handleLogOut}>
          <LogoutOutlined />
          Log out
        </Button>
      </TopBarSection>
    </TopBar>
  );
};

export default Header;
