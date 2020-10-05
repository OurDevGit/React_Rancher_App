import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import cookies from "react-cookies";
import { Link, useLocation } from "react-router-dom";

import {
  ContainerVertical,
  ContainerHorizontal,
  TabContainer,
  TabItem,
} from "@duik/it";

import Header from "../../components/Header";
import ClusterNavigationTablet from "../../components/Navigation/ClusterNavigationTablet";
import TopBarMobile from "../../components/Header/TopBarMobile";
import EditCluster from "./EditCluster"
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

const Cluster = (props) => {
  const location = useLocation();
  const locationPath = location.pathname.split("/");
  const locationSearch = location.search;
  let provider = "";
  if(locationSearch.split("&")[0].split("=")[0] == "?provider"){
    provider = locationSearch.split("&")[0].split("=")[1];
  }
  const cookieLoginStatus = JSON.parse(cookies.load("isLoggedIn"));
  const isLoggedIn = useSelector((state) => state.user.isLoginSuccess);
  const headerTitle = useSelector((state) => state.settings.headerTitle);
  const [c_id, setCluterId] = useState(locationPath[2]);
  const [page_type, setPageType] = useState(locationPath[3]);
  const [edit_type, setProvider] = useState(provider);
  useEffect(() => {
    if (!isLoggedIn && !cookieLoginStatus) props.history.push("/login");
  }, [isLoggedIn, cookieLoginStatus, props]);

  return (
    <ContainerHorizontal>
      <ClusterNavigationTablet active="Clusters" />
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
        {
          page_type == "edit" ? <EditCluster clusterId= {c_id} editType={edit_type} />
          : null
        }
        
      </ContainerVertical>
    </ContainerHorizontal>
  );
};
export default Cluster;
