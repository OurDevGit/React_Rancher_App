import * as React from "react";
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
import Icon from "@duik/icon";
import cls from "./styles.module.scss";

const menuLinks = [
  {
    text: "Dashboard",
    icon: "gallery_grid_view",
  },
  {
    text: "Calendar",
    icon: "calendar",
  },
  {
    text: "Inbox",
    icon: "inbox_paper_round",
  },
  {
    text: "Invoicing",
    icon: "money_round",
  },
  {
    text: "Lab / Experimental",
    icon: "container",
  },
];

const Navigation = () => {
  return (
    <NavPanel className={cls.wrapper}>
      <ContainerVertical>
        <TopBar className={cls.navigation_topBar}>
          <TopBarSection>
            <Icon>home</Icon>
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
                className={link.text === "Dashboard" ? "active" : null}
                icon={<Icon>{link.icon}</Icon>}
                highlighted
              >
                <strong>{link.text}</strong>
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
