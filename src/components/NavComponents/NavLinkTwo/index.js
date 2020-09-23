import * as React from "react";
import classnames from "classnames";

import cls from "./styles.module.scss";

const NavLinkTwo = ({
  rightEl,
  children,
  className,
  highlighted,
  icon,
  Component,
  ...rest
}) => (
  <Component
    className={classnames(cls.wrapper, className, {
      [cls.highlighted]: highlighted,
    })}
    {...rest}
  >
    <span className={cls.text}>
      {icon && <span className={cls.icon}>{icon}</span>}
      {children}
    </span>
    {rightEl && <span className={cls.rightEl}>{rightEl}</span>}
  </Component>
);

NavLinkTwo.defaultProps = {
  className: null,
  rightEl: null,
  highlighted: false,
  icon: null,
  children: null,
  Component: "a",
};

export default NavLinkTwo;
