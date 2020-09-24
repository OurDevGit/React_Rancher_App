import * as React from "react";
import classnames from "classnames";

import cls from "./styles.module.scss";

const NavUser = ({
  children,
  className,
  Component,
  name,
  imgUrl,
  textTop,
  isGitHub,
  ...rest
}) => (
    <div className={classnames(cls.wrapper, className)} {...rest}>
      {imgUrl && (
        <div className={cls.avatarWrapper}>
          <img alt="bob" className={isGitHub ? cls.avatar_git : cls.avatar} src={imgUrl} />
        </div>
      )}
      {name && <span className={cls.name}>{name}</span>}
      {textTop && <span className={cls.textTop}>{textTop}</span>}
      {children}
    </div>
  );

NavUser.defaultProps = {
  className: null,
  children: null,
  Component: "div",
  name: null,
  imgUrl: null,
  textTop: null,
};

export default NavUser;
