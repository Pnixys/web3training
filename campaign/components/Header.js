import React from 'react'
import { Menu, MenuMenu } from 'semantic-ui-react'

const Header = () => {
  return (
    <Menu style={{ marginTop: '10px'}}>
        <Menu.Item >CrowdCoin</Menu.Item>
        <MenuMenu position='right'>
            <Menu.Item>Campaign</Menu.Item>
            <Menu.Item>+</Menu.Item>
        </MenuMenu>
    </Menu>
  )
}

export default Header