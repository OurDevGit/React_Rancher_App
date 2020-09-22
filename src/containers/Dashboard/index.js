import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
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

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isLoggedIn, setIsLoggedIn] = useState(user.isLoginSuccess);

  useEffect(() => {
    if (!isLoggedIn) return <Redirect to="/login" />;
  }, [user]);
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
        <Header />
      </ContainerVertical>
    </ContainerHorizontal>
  );
};
export default Dashboard;
