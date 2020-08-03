import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.modules.css';

const Modal = ({ intro, index, setIndex, maxLength, isVisible, onClose, ...props }) => {

    const [hasSetEventListener, setEventListener] = useState(false);

    const isInRange = (x) => {
        const min = 0;
        const max = maxLength - 1;
        return x >= min && x <= max;
    }

    const prev = () => {
        if (isInRange(index - 1)) {
            setIndex(index - 1);
        } else {
            onCloseAndReset();
        }
    }

    const next = () => {
        if (isInRange(index + 1)) {
            setIndex(index + 1);
        } else {
            onCloseAndReset();
        }
    }

    const onCloseAndReset = () => {
        onClose();
        setIndex(0);
    }

    const checkKey = (e) => {
        e = e || window.event;
        const { keyCode } = e;
        if ([38, 39].includes(keyCode)) { // up and right arrow
            next();
        } else if ([40, 37].includes(keyCode)) { // down and left arrow
            prev();
        } else if (keyCode === 27) { // escape key
            onCloseAndReset();
        }
        setEventListener(false);
        document.removeEventListener("keydown", checkKey, false);
    };
    
    if (!hasSetEventListener) {
        document.addEventListener("keydown", checkKey, false);
        setEventListener(true);
    }

    return (
        <div className={`${styles['modal-pane']} ${isVisible && styles['show-modal']}`}>
            <div className={`${styles['modal-content']}`}>
                <img src="https://cdn4.iconfinder.com/data/icons/avatar-circle-1-1/72/6-512.png" />
                <div className={`${styles['modal-header']} ${styles['fixed-top']}`}>
                    <h4></h4>
                    <p onClick={onClose}>close</p>
                </div>
                <div className={`${styles['modal-body']}`}>
                    {
                        props.children
                    }
                    {
                        intro 
                        ? <div className={styles['align-center']}>
                            <button className={styles['button-primary']} onClick={next}>Yes, show me</button>
                            <button className={styles['button-secondary']} onClick={onCloseAndReset}>Not right now</button>
                        </div>
                        : index === (maxLength - 1) 
                            ? <div className={styles['align-center']}>
                                <button className={styles['button-secondary']} onClick={prev}>previous</button>
                                <button className={styles['button-primary']} onClick={onCloseAndReset}>End Tour</button>
                            </div>
                            : <div className={styles['align-center']}>
                                <button className={styles['button-secondary']} onClick={prev}>previous</button>
                                <button className={styles['button-primary']} onClick={next}>next</button>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    intro: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    setIndex: PropTypes.func.isRequired,
    maxLength: PropTypes.number.isRequired,
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};
  
Modal.defaultProps = {
    isVisible: false
}

export default Modal;