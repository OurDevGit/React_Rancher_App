import * as React from 'react'
import classnames from 'classnames'

import cls from './styles.module.scss'

type NavLinkTwoContainerProps = {
  children?: React.Node,
  className?: ?String,
  positionRight?: ?Boolean
}

const NavLinkTwoContainer = ({
  children,
  className,
  positionRight,
  ...rest
}: NavLinkTwoContainerProps) => (
  <div
    className={ classnames(cls.wrapper, className, {
      [cls.positionRight]: positionRight,
    }) }
    { ...rest }
  >
    {children}
  </div>
)

NavLinkTwoContainer.defaultProps = {
  className: null,
  positionRight: false,
  children: null,
}

export default NavLinkTwoContainer
