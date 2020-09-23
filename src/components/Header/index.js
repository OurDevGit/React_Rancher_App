import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { TopBar, TopBarSection, TopBarTitle } from "@duik/it";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { userLogOutRequest } from "../../actions/user";

import "./styles.scss";

const Header = (props) => {
  const dispatch = useDispatch();
  const headerTitle = useSelector((state) => state.settings.headerTitle);
  const handleMenuClick = (e) => {
    if (e.key === "5") dispatch(userLogOutRequest());
    console.log(e.key);
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      style={{ padding: "15px 15px 10px 15px", width: 250 }}
    >
      <Menu.Item key="1">{"API & Keys"}</Menu.Item>
      <Menu.Item key="2">Cloud Credentials</Menu.Item>
      <Menu.Item key="3">Node Templates.</Menu.Item>
      <Menu.Item key="4">Preferences</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="5">Log out</Menu.Item>
    </Menu>
  );

  return (
    <TopBar {...props}>
      <TopBarSection>
        <TopBarTitle large>{headerTitle}</TopBarTitle>
      </TopBarSection>
      <TopBarSection>
        <Dropdown overlay={menu}>
          <div
            className="ant-dropdown-link"
            onClick={(e) => e.preventDefault()}
            to="#"
          >
            User Settings <DownOutlined />
          </div>
        </Dropdown>
      </TopBarSection>
    </TopBar>
  );
};

export default Header;
