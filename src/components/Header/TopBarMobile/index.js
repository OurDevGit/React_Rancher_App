import * as React from "react";
import * as images from "../../../exampleAssets";

import { Avatar, TopBar, TopBarSection, TextField } from "@duik/it";
import Icon from "@duik/icon";

import cls from "./styles.module.scss";

const Header = (props) => (
  <TopBar className={cls.wrapper} {...props}>
    <TopBarSection className={cls.inputWrapper}>
      <TextField
        clear
        leftEl={<Icon>search_left</Icon>}
        placeholder="Type to search..."
        wrapperProps={{
          className: cls.inputWrapper,
        }}
      />
    </TopBarSection>
    <TopBarSection>
      <Avatar imgUrl={images.a21} />
    </TopBarSection>
  </TopBar>
);

export default Header;
