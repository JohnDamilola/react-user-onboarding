import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import useEventListener from './../../hooks/use-event-listener';
import styles from './styles.modules.css';

/**
 * The modal component of the onboarding flow
 * @param {object} props Component props
 * @param {bool} props.intro value to determine intro step
 * @param {number} props.index the position of the modal in the onboarding flow story object
 * @param {function} props.setIndex function to set the value of the index
 * @param {string} props.className css class for the modal
 * @param {number} props.maxLength the total number of steps in the onboarding flow
 * @param {bool} props.isVisible value used to toggle the component's visibility
 * @param {function} props.onClose function to close the component
 * @returns {JSX.Element} Component template
 */
const Modal = ({ intro, index, setIndex, className, maxLength, isVisible, onClose, ...props }) => {

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

    var overlays = document.getElementsByTagName("section");
    for (let overlay of overlays) {
        document.body.removeChild(overlay)
    }

    const checkKey = useCallback((e) => {
        e = e || window.event;
        const { keyCode } = e;
        if ([38, 39].includes(keyCode)) { // up and right arrow
            next();
        } else if ([40, 37].includes(keyCode)) { // down and left arrow
            prev();
        } else if (keyCode === 27) { // escape key
            onCloseAndReset();
        }
    });

    // Add event listener for keydown
    useEventListener('keydown', checkKey);

    return (
        <div className={`${className} ${styles['modal-pane']} ${isVisible && styles['show-modal']}`}>
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
    className: PropTypes.string,
    maxLength: PropTypes.number.isRequired,
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};
  
Modal.defaultProps = {
    isVisible: false
}

export default Modal;