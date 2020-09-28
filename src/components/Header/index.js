import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as images from "../../exampleAssets";
import { TopBar, TopBarSection, TopBarTitle, Avatar, TextField } from "@duik/it";
import Icon from '@duik/icon'
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { userLogOutRequest } from "../../actions/user";
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/scss/react-flags-select.scss';
import AWS from "aws-sdk/global";
import Identicon from "identicon.js";

import "./styles.scss";

const Header = (props) => {
  const dispatch = useDispatch();
  // const headerTitle = useSelector((state) => state.settings.headerTitle);
  const headerTitle = props.title;
  const user = useSelector((state) => state.user.currentUser);
  const [ghAvatarSrc, setGhAvatarSrc] = useState("");
  const [currentUserName, setCurrentUserName] = useState();
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

  useEffect(() => {
    if (user && user.id) {
      const data = AWS.util.crypto.md5(user.id, "hex");
      const settings = JSON.parse(localStorage.getItem("settings"));
      const userNameData = {
        name: user.name,
        type:
          settings.provider.charAt(0).toUpperCase() +
          settings.provider.slice(1) +
          " " +
          user.type.charAt(0).toUpperCase() +
          user.type.slice(1),
        userName: user.username,
      };
      setGhAvatarSrc(
        `data:image/png;base64,${new Identicon(data, 80, 0.01).toString()}`
      );
      setCurrentUserName(userNameData);
    }
  }, [user]);


  return (
    <TopBar {...props}>
      <TopBarSection>
        <TopBarTitle large>
          {headerTitle}
        </TopBarTitle>
        <TopBarTitle large>
          <TextField
            leftEl={<Icon>search_left</Icon>}
            placeholder="Search..."
          />
        </TopBarTitle>

      </TopBarSection>

      <TopBarSection>
        {user && user.id ?
          <>

            <ReactFlagsSelect
              countries={["US", "GB", "DE", "IT"]}
              customLabels={{ "US": "English(EN-US)", "GB": "English(EN-GB)", "DE": "Deutsch(DE-DE)", "IT": "Italiano(IT-IT)" }}
              placeholder="Select Language"
              defaultCountry="US" />
            <Avatar
              imgUrl={ghAvatarSrc !== "" ? ghAvatarSrc : images.a21}
              name={
                currentUserName
                  ? currentUserName.name + `(${currentUserName.userName})`
                  : "User"
              }
              textBottom={currentUserName ? currentUserName.type : "user"}
              className="userAvatar"
            />
            <Dropdown overlay={menu} className="userSetting_dropdown">
              <div
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
                to="#"
              >
                <DownOutlined />
              </div>
            </Dropdown>
          </>
          : null
        }

      </TopBarSection>
    </TopBar>
  );
};

export default Header;
