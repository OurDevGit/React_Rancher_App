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
import {
  GlobalOutlined,
  ClusterOutlined,
  AppstoreOutlined,
  SettingOutlined,
  SecurityScanOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import cls from "./styles.module.scss";

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

const Dashboard = (props) => {
  const cookieLoginStatus = JSON.parse(cookies.load("isLoggedIn"));
  const isLoggedIn = useSelector((state) => state.user.isLoginSuccess);

  useEffect(() => {
    if (!isLoggedIn && !cookieLoginStatus) props.history.push("/login");
  }, [isLoggedIn, cookieLoginStatus, props]);

  return (
    <ContainerHorizontal>
      <NavigationTablet />
      <ContainerVertical>
        <TopBarMobile />
        <TabContainer className={cls.mobileNavigation}>
          {tabItems.map((item) => (
            <TabItem
              key={item.to}
              activeclassname="active"
              className={cls.mobileItem}
              Component={Link}
              size="smaller"
              // to={`${item.to}`}
              to="#"
            >
              {item.content}
            </TabItem>
          ))}
        </TabContainer>
        <Header history={props.history} />
      </ContainerVertical>
    </ContainerHorizontal>
  );
};
export default Dashboard;
