import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as images from "../../../exampleAssets";
import { NavUser, NavLinkTwoContainer, NavLinkTwo } from "../../NavComponents";
import {
  NavSection,
  NavLink,
  NavSectionTitle,
  TopBar,
  TopBarSection,
  NavPanel,
  ContainerVertical,
  ScrollArea,
} from "@duik/it";

import {
  GlobalOutlined,
  ClusterOutlined,
  AppstoreOutlined,
  SettingOutlined,
  SecurityScanOutlined,
  ToolOutlined,
  DownOutlined,
} from "@ant-design/icons";

import { setHeaderTitle } from "../../../actions/settings";

import "./styles.scss";

import logoImg from "../../../assets/img/DeltaDevOps.png";

const menuLinks = [
  {
    text: "Global",
    icon: <GlobalOutlined />,
    isDropdown: false,
  },
  {
    text: "Clusters",
    icon: <ClusterOutlined />,
    isDropdown: false,
  },
  {
    text: "Apps",
    icon: <AppstoreOutlined />,
    isDropdown: false,
  },
  {
    text: "Settings",
    icon: <SettingOutlined />,
    isDropdown: false,
  },
  {
    text: "Security",
    icon: <SecurityScanOutlined />,
    isDropdown: true,
  },
  {
    text: "Tools",
    icon: <ToolOutlined />,
    isDropdown: true,
  },
];
const Navigation = () => {
  const dispatch = useDispatch();
  const [currentItem, setCurrentItem] = useState("Clusters");
  const handleNavItemClick = (item) => {
    if (!item.isDropdown) {
      setCurrentItem(item.text);
      dispatch(setHeaderTitle(item.text))
    }
  };
  return (
    <NavPanel className="navigation-wrapper">
      <ContainerVertical>
        <TopBar className="navigation-topbar">
          <TopBarSection>
            <div className="navigation-logo">
              <img src={logoImg} alt="" />
            </div>
          </TopBarSection>
        </TopBar>
        <ScrollArea>
          <NavUser
            imgUrl={images.a21}
            name="Martha Blair"
            textTop="Art Director"
          />
          <NavLinkTwoContainer>
            {menuLinks.map((link) => (
              <NavLinkTwo
                key={link.text}
                className={link.text === currentItem ? "active" : null}
                icon={link.icon}
                highlighted
                rightEl={link.isDropdown ? <DownOutlined /> : null}
                onClick={() => handleNavItemClick(link)}
              >
                {link.text}
              </NavLinkTwo>
            ))}
          </NavLinkTwoContainer>
          <NavSection>
            <NavSectionTitle>Recently viewed</NavSectionTitle>
            <NavLink rightEl="→">Overall Performance</NavLink>
            <NavLink rightEl="→">Invoice #845</NavLink>
            <NavLink rightEl="→">Customer: Minerva Viewer</NavLink>
          </NavSection>
        </ScrollArea>
      </ContainerVertical>
    </NavPanel>
  );
};

export default Navigation;
