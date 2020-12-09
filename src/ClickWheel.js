import React from 'react';
import './ClickWheel.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faFastBackward, faFastForward, faPause } from '@fortawesome/free-solid-svg-icons';
const ClickWheel = (props) => {
    const { onMenuButton ,onMenu,onFastBackward,onFastFarward,onPause} = props;
    return (<div class="outer" >
        <div class="middle" id="wheel-container">

            <div class="inner" onClick={(e) => onMenuButton()}>
                <span className="action-button menu" onClick={(e) => onMenu(e)} ><FontAwesomeIcon style={{ fontSize: '.5em' }} icon={faBars} /></span>
                <span className="action-button prv" onClick={(e) => onFastBackward(e)}><FontAwesomeIcon style={{ fontSize: '.5em' }} icon={faFastBackward} /></span>
                <span className="action-button next" onClick={(e) => onFastFarward(e)}><FontAwesomeIcon style={{ fontSize: '.5em' }} icon={faFastForward} /></span>
                <span className="action-button stop" onClick={(e) => onPause(e)}><FontAwesomeIcon style={{ fontSize: '.5em' }} icon={faPause} /></span>
            </div>
        </div>
    </div>
    )
}
export default ClickWheel;

