import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { NavLinkTwoContainer, NavLinkTwo } from "../../NavComponents";
import {
  NavSection,
  NavLink,
  TopBar,
  TopBarSection,
  NavPanel,
  ContainerVertical,
  ScrollArea,
} from "@duik/it";
import { Row, Col, Modal, Dropdown, Menu } from "antd";
import {
  GlobalOutlined,
  ClusterOutlined,
  AppstoreOutlined,
  SettingOutlined,
  SecurityScanOutlined,
  ToolOutlined,
  DownOutlined,
  AppleOutlined,
  WindowsOutlined,
  QqOutlined,
  TeamOutlined,
  GroupOutlined,
  SolutionOutlined,
  KeyOutlined,
  FileProtectOutlined,
  BookOutlined,
  NodeIndexOutlined,
  FileOutlined,
  UpOutlined
} from "@ant-design/icons";

import { setHeaderTitle } from "../../../actions/settings";

import "./styles.scss";

import logoImg from "../../../assets/img/DeltaDevOps.png";

const security_submenu = [
  {
    text: "Users",
    icon: <TeamOutlined />,
    isDropdown: false,
  },
  {
    text: "Groups",
    icon: <GroupOutlined />,
    isDropdown: false,
  },
  {
    text: "Roles",
    icon: <SolutionOutlined />,
    isDropdown: false,
  },
  {
    text: "Pod Security Policies",
    icon: <FileProtectOutlined />,
    isDropdown: false,
  },
  {
    text: "Authentication",
    icon: <KeyOutlined />,
    isDropdown: false,
  }
];
const tools_submenu = [
  {
    text: "Catalogs",
    icon: <BookOutlined />,
    isDropdown: false,
  },
  {
    text: "Drivers",
    icon: <NodeIndexOutlined />,
    isDropdown: false,
  },
  {
    text: "RKE Templates",
    icon: <FileOutlined />,
    isDropdown: false,
  }
];

const menuLinks = [
  {
    text: "Global",
    to: "",
    icon: <GlobalOutlined />,
    isDropdown: false,
    submenu: null
  },
  {
    text: "Clusters",
    to: "/dashboard",
    icon: <ClusterOutlined />,
    isDropdown: false,
    submenu: null
  },
  {
    text: "Apps",
    to: "/apps",
    icon: <AppstoreOutlined />,
    isDropdown: false,
    submenu: null
  },
  {
    text: "Settings",
    to: "/settings",
    icon: <SettingOutlined />,
    isDropdown: false,
    submenu: null
  },
  {
    text: "Security",
    to: "",
    icon: <SecurityScanOutlined />,
    isDropdown: true,
    submenu: security_submenu
  },
  {
    text: "Tools",
    to: "",
    icon: <ToolOutlined />,
    isDropdown: true,
    submenu: tools_submenu
  },
];
const Navigation = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [currentItem, setCurrentItem] = useState(props.active);
  const [actived_submenu, setActiveSubmenu] = useState("");
  const handleNavItemClick = (item) => {
    if (!item.isDropdown) {
      setCurrentItem(item.text);
      dispatch(setHeaderTitle(item.text));
    } else {
      if (actived_submenu != item.text) {
        setActiveSubmenu(item.text);
      } else {
        setActiveSubmenu('');
      }
    }
  };

  const versionInfo = () => {
    Modal.info({
      title: "DeltaDevOps",
      width: 600,
      content: (
        <div className="version-modal">
          <Row className="modal-header">
            <Col span={12}>Component</Col>
            <Col span={12}>Version</Col>
          </Row>
          <Row>
            <Col span={12}>
              <a href="">DeltaDevOps</a>
            </Col>
            <Col span={12}>v2.4.8</Col>
          </Row>
          <Row>
            <Col span={12}>
              <a href="">User Interface</a>
            </Col>
            <Col span={12}>vmaster-dev</Col>
          </Row>
          <Row>
            <Col span={12}>
              <a href="">Helm</a>
            </Col>
            <Col span={12}>v2.16.8-rancher1</Col>
          </Row>
          <Row>
            <Col span={12}>
              <a href="">Machine</a>
            </Col>
            <Col span={12}>v0.15.0-rancher45</Col>
          </Row>
          <Row>
            <Col span={12}>Linux Image List</Col>
            <Col span={12}>
              <a href="">Download</a>
            </Col>
          </Row>
          <Row>
            <Col span={12}>Windows Image List</Col>
            <Col span={12}>
              <a href="">Download</a>
            </Col>
          </Row>
        </div>
      ),
      onOk() { },
    });
  };

  const menuLanguage = (
    <Menu style={{ padding: 20 }}>
      <Menu.Item>English</Menu.Item>
    </Menu>
  );

  const menuDownload = (
    <Menu style={{ padding: 20 }}>
      <Menu.Item>
        <AppleOutlined /> MacOS
      </Menu.Item>
      <Menu.Item>
        <WindowsOutlined /> Windows
      </Menu.Item>
      <Menu.Item>
        <QqOutlined /> Linux
      </Menu.Item>
    </Menu>
  );

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
          <NavLinkTwoContainer>
            {menuLinks.map((link) => (
              <>
                <NavLinkTwo
                  key={link.text}
                  className={link.text === currentItem ? "active" : null}
                  icon={link.icon}
                  highlighted
                  rightEl={link.isDropdown && actived_submenu != link.text ? <DownOutlined /> : link.isDropdown && actived_submenu == link.text ? <UpOutlined /> : null}
                  onClick={() => handleNavItemClick(link)}
                  Component={ link.isDropdown ? "a" : Link}
                  to={link.isDropdown ? null : link.to}
                >
                  {link.text}
                </NavLinkTwo>
                {link.submenu ?
                  <div className={actived_submenu == link.text ? "submenu show" : "submenu"}>
                    {link.submenu.map((sublink) => (
                      <NavLinkTwo
                        key={sublink.text}
                        className={sublink.text === currentItem ? "active" : null}
                        icon={sublink.icon}
                        highlighted
                        rightEl={sublink.isDropdown ? <DownOutlined /> : null}
                        onClick={() => handleNavItemClick(sublink)}
                        Component={Link}
                        to={sublink.isDropdown ? null : "/" + link.text + "/" + sublink.text}
                      >
                        {sublink.text}
                      </NavLinkTwo>
                    ))}
                  </div> : null
                }

              </>
            ))}
          </NavLinkTwoContainer>
          <NavSection>
            <NavLink onClick={versionInfo}>v2.4.8</NavLink>
            {/* <Dropdown overlay={menuLanguage}>
              <NavLink rightEl={<DownOutlined />}>English</NavLink>
            </Dropdown> */}
            <Dropdown overlay={menuDownload}>
              <NavLink rightEl={<DownOutlined />}>Download CLI</NavLink>
            </Dropdown>
          </NavSection>
        </ScrollArea>
      </ContainerVertical>
    </NavPanel>
  );
};

export default Navigation;
