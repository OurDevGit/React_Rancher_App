import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import cookies from "react-cookies";
import { Link } from "react-router-dom";

import {
  ContainerVertical,
  ContainerHorizontal,
  TabContainer,
  TabItem,
} from "@duik/it";

import Header from "../../components/Header";
import NavigationTablet from "../../components/Navigation/NavigationTablet";
import TopBarMobile from "../../components/Header/TopBarMobile";
import ClusterList from "./ClusterList"
import {
  GlobalOutlined,
  ClusterOutlined,
  AppstoreOutlined,
  SettingOutlined,
  SecurityScanOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import "./styles.scss";

const tabItems = [
  {
    to: "/global",
    content: <GlobalOutlined />,
  },
  {
    to: "/cluster",
    content: <ClusterOutlined />,
  },
  {
    to: "/apps",
    content: <AppstoreOutlined />,
  },
  {
    to: "/settings",
    content: <SettingOutlined />,
  },
  {
    to: "/security",
    content: <SecurityScanOutlined />,
  },  
  {
    to: "/tools",
    content: <ToolOutlined />,
  },
];

const Global = (props) => {
  const cookieLoginStatus = JSON.parse(cookies.load("isLoggedIn"));
  const isLoggedIn = useSelector((state) => state.user.isLoginSuccess);
  const headerTitle = useSelector((state) => state.settings.headerTitle);
  useEffect(() => {
    if (!isLoggedIn && !cookieLoginStatus) props.history.push("/login");
  }, [isLoggedIn, cookieLoginStatus, props]);

  return (
    <ContainerHorizontal>
      <NavigationTablet active="Clusters" />
      <ContainerVertical>
        <TopBarMobile />
        <TabContainer className="mobileNavigation">
          {tabItems.map((item) => (
            <TabItem
              key={item.to}
              activeclassname="active"
              className="mobileItem"
              Component={Link}
              size="smaller"
              to={`${item.to}`}
            >
              {item.content}
            </TabItem>
          ))}
        </TabContainer>
        <Header history={props.history} title="Clusters" />
        <ClusterList />
      </ContainerVertical>
    </ContainerHorizontal>
  );
};
export default Global;
