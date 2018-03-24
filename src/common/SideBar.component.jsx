import React from 'react';
import { Menu } from 'semantic-ui-react';

//styles
import './SideBar.css';

const SideBar = props => {
  const { activeItem, handleItemClick } = props;

  return (
    <div className="sidebar-container">
      <span>OVERVIEW</span>
      <Menu fluid vertical tabular>
        <Menu.Item
          name="admin"
          active={activeItem === 'admin'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="user API"
          active={activeItem === 'user'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="device API"
          active={activeItem === 'device'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="global List API"
          active={activeItem === 'global'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="policy API"
          active={activeItem === 'policy'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="zone API"
          active={activeItem === 'zone'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="threat API"
          active={activeItem === 'threat'}
          onClick={handleItemClick}
        />
      </Menu>
    </div>
  );
};

export default SideBar;
