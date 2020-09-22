import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  ContainerVertical,
  ContainerHorizontal,
  TabContainer,
  TabItem,
} from "@duik/it";
import Icon from "@duik/icon";
import Header from "../../components/Header";
import NavigationTablet from "../../components/Navigation/NavigationTablet";
import TopBarMobile from "../../components/Header/TopBarMobile";

import cls from "./styles.module.scss";

const tabItems = [
  {
    to: "/",
    content: <Icon>gallery_grid_view</Icon>,
  },
  {
    to: "/calendar",
    content: <Icon>calendar</Icon>,
  },
  {
    to: "/inbox",
    content: <Icon>inbox_paper_round</Icon>,
  },
  {
    to: "/invocing",
    content: <Icon>money_round</Icon>,
  },
  {
    to: "/lab",
    content: <Icon>container</Icon>,
  },
];

const Dashboard = (props) => {
  const isLoggedIn = useSelector((state) => state.user.isLoginSuccess);
  useEffect(() => {
    if (!isLoggedIn) props.history.push("/login");
  }, [isLoggedIn, props]);

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
              to={`${item.to}`}
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
