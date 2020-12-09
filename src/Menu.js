import MenuItem from './MenuItem';

const Menu = (props) => {
    const { menuItems, menuTitle } = props;
    return (<div style={styles.menu}>
        <h5 style={styles.menuTitle}>{menuTitle}</h5>
        {
            menuItems.map((item) => {
                return (<MenuItem item={item} key={item.id} />)
            })
        }
    </div>
    );
}
export default Menu;

const styles = {
    heading: {

    },
    menuTitle: {
        margin: '0em',
        marginBottom: '1em',
        fontSize: '1em',
        fontFamily: 'sans-serif'
    },
    menu: {
        width: '16em',
        height: '12em',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '1em'
    }
}