import * as React from 'react'
import classnames from 'classnames'

import cls from './styles.module.scss'

type NavUserProps = {
  children?: React.Node,
  className?: ?String,
  Component?: React.ElementType,
  name?: React.Node,
  imgUrl?: String,
  textTop?: React.Node
}

const NavUser = ({
  children,
  className,
  Component,
  name,
  imgUrl,
  textTop,
  ...rest
}: NavUserProps) => (
  <div
    className={ classnames(cls.wrapper, className) }
    { ...rest }
  >
    {
      imgUrl && (
        <div className={ cls.avatarWrapper }>
          <img
            alt="bob"
            className={ cls.avatar }
            src={ imgUrl }
          />
        </div>
      )
    }
    {
      name && (
        <span className={ cls.name }>
          {name}
        </span>
      )
    }
    {
      textTop && (
        <span className={ cls.textTop }>
          {textTop}
        </span>
      )
    }
    {children}
  </div>
)

NavUser.defaultProps = {
  className: null,
  children: null,
  Component: 'div',
  name: null,
  imgUrl: null,
  textTop: null,
}

export default NavUser
