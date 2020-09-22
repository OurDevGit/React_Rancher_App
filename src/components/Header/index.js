import * as React from 'react'
import * as images from '../../exampleAssets'

import {
  TopBar,
  TopBarSection,
  TopBarTitle,
  Select,
} from '@duik/it'

import cls from './styles.module.scss'


const Header = props => (
  <TopBar { ...props }>
    <TopBarSection>
      <TopBarTitle large>
        Dashboard
      </TopBarTitle>
    </TopBarSection>
    <TopBarSection>

      <Select
        defaultValue={ ['english'] }
        options={ [
          {
            value: 'english',
            label: (
              <span>
                <img
                  alt="english"
                  className={ cls.selectFlag }
                  src={ images.flag01 }
                />
                ENG
              </span>
            ),
          },
          {
            value: 'english2',
            label: (
              <span>
                <img
                  alt="english"
                  className={ cls.selectFlag }
                  src={ images.flag01 }
                />
                ENG 2
              </span>
            ),
          },
        ] }
        placeholder="Action"
      />
    </TopBarSection>
  </TopBar>
)

export default Header
