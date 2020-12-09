import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
const MenuItem = (props) => {

    const { item } = props;
    const { isActive } = item;
    return (isActive ? <p style={styles.ActiveMenuItem}>{item.name}<FontAwesomeIcon style={{ fontSize: '.5em', paddingLeft: '1em' }} icon={faAngleRight} /></p> : <p style={styles.menuItem}>{item.name}
    </p>);
}
export default MenuItem;

const styles = {
    menuItem: {
        fontSize: '1.6em',
        margin: '0em',
        padding: '0em',
    },
    ActiveMenuItem: {
        backgroundColor: 'blue',
        color: 'white',
        fontSize: '1.5em',
        margin: '0em',
        padding: '0em',
    }
}