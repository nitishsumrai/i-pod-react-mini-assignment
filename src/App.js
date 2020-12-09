import './App.css';
import Menu from './Menu';
import ZingTouch from 'zingtouch';
import ClickWheel from './ClickWheel';
import React from 'react';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // an array to stores the previous menulists
      // as we enter in any child-menu current menu's object gets stored in array,
      // as we go back to parent menu delete last object(parent of current menu)
      menuList: [],
      menuTitle: 'Menu',
      runApp: false,
      appInfo: {},
      menuItems: [{
        id: 1,
        img: '',
        name: 'Music',
        child_menu: [{
          id: 4,
          name: 'all song',
          img: 'https://images.unsplash.com/photo-1495434786667-8d322ec659f0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=857&q=80',
          child_menu: [],
          isActive: false
        },
        {
          id: 5,
          img: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
          name: 'singer',
          child_menu: [],
          isActive: true
        },
        {
          id: 6,
          img: 'https://beebom.com/wp-content/uploads/2018/02/gaana-1.jpg',
          name: 'recent',
          child_menu: [],
          isActive: false
        }],

      }, {
        id: 2,
        img: 'https://images.unsplash.com/photo-1523875194681-bedd468c58bf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80',
        name: 'Game',
        child_menu: [],
        isActive: true
      }, {
        id: 3,
        img: 'https://images.unsplash.com/photo-1513210431415-cba4b6cb5d88?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80',
        name: 'Settings',
        child_menu: [],
        isActive: false
      }]
    }
  }

  componentDidMount() {
    const myEle = document.getElementById('wheel-container');
    console.log(myEle);
    const zingtouch = new ZingTouch.Region(myEle);

    zingtouch.bind(myEle, 'rotate', (e) => {
      if (e.detail.distanceFromLast >= 4) {
        console.log('Down');
        this.goDown();
      }
      if (e.detail.distanceFromLast <= -4) {
        console.log('Up')
        this.goUp();
      }
    },
      false)

  }
  // make next menu item active
  goDown = () => {
    const { menuItems } = this.state;
    // get Index of Active Item
    const index = menuItems.findIndex((item) => item.isActive);
    menuItems[index].isActive = false;
    // if its a last item then make first item As Active
    if (index === menuItems.length - 1) {
      menuItems[0].isActive = true;
    } else {
      // select next item as Active 
      menuItems[index + 1].isActive = true;
    }
    this.setState({
      menuItems: menuItems
    })
  }

  // make previous menu item active
  goUp = () => {
    const { menuItems } = this.state;
    // get Index of Active Item
    const index = menuItems.findIndex((item) => item.isActive);
    menuItems[index].isActive = false;
    // if it's a first item then make last item as active
    if (index === 0) {
      menuItems[menuItems.length - 1].isActive = true;
    } else {
      // select prv item as active
      menuItems[index - 1].isActive = true;
    }
    this.setState({
      menuItems: menuItems
    })
  }

  handleClickOnMenuButton = () => {
    console.log('Menu Button Clicked');
    const { menuItems, menuList, menuTitle } = this.state;

    // get Index of active item
    const index = menuItems.findIndex((item) => item.isActive);
    const activeItem = menuItems[index];
    // push current menu's object in menuList
    menuList.push({ prvMenuItems: menuItems, prvMenuTitle: menuTitle });

    // if it has chid_menu,enter user in that menu
    if (activeItem.child_menu.length > 0) {
      this.setState({
        menuItems: activeItem.child_menu,
        menuTitle: activeItem.name
      })
    } else {
      // run App,set info of app in state
      this.setState({
        // now we have a app to run
        runApp: true,
        appInfo: {
          img: activeItem.img,
          title: activeItem.name
        }
      })
    }
  }

  handleClickOnMenu = (e) => {
    e.stopPropagation();
    const { menuList } = this.state;

    // if elem is present in array then there is a parent menu
    if (menuList.length > 0) {
      const { prvMenuItems, prvMenuTitle } = menuList.pop();
      this.setState({
        menuItems: prvMenuItems,
        menuTitle: prvMenuTitle,
        runApp: false,
        appInfo: {}
      });
    }
  }

  // yet to define functionality of following handlers
  handleClickOnFastFarward = (e) => {
    e.stopPropagation();
  }
  handleClickOnFastBackward = (e) => {
    e.stopPropagation();
  }
  handleClickOnPause = (e) => {
    e.stopPropagation();
  }
  render() {
    const { menuItems, menuTitle, runApp, appInfo } = this.state;
    const { handleClickOnMenuButton, handleClickOnPause, handleClickOnFastFarward, handleClickOnFastBackward, handleClickOnMenu } = this;

    return (
      <div className="App">

        <div className="screen">
          {/* if we have a app to run then render app container or render menu container */}
          {!runApp && <div className="menu-container"><Menu menuItems={menuItems} menuTitle={menuTitle} /></div>}
          {runApp && <div className="app-container" style={{ backgroundImage: "url(" + appInfo.img + ")" }}><h3>{appInfo.title}</h3></div>}
        </div>
        <ClickWheel
          onMenuButton={handleClickOnMenuButton}
          onMenu={handleClickOnMenu}
          onFastFarward={handleClickOnFastFarward}
          onFastBackward={handleClickOnFastBackward}
          onPause={handleClickOnPause}
        />
      </div>
    );
  }
}

export default App;
