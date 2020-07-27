import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.modules.css';

const Tooltip = ({ id, index, setIndex, selectedData, maxLength, title, position, children, isVisible, ...props }) => {
    const node = useRef();

    const isInRange = (x) => {
        const min = 0;
        const max = maxLength - 1;
        return x >= min && x <= max;
    }

    const prev = () => {
        if (isInRange(index - 1)) {
            setIndex(index - 1);
        }
    }

    const next = () => {
        if (isInRange(index + 1)) {
            setIndex(index + 1);
        }
    }

    const { ref: { current } } = selectedData;
    const elementDimensions = current.getBoundingClientRect();
    console.log(current, elementDimensions);
    const { left, right, top, width } = elementDimensions;
    return (
        <div className={styles.container}
            data-testid="tooltip"
            ref={node}
            style={{ position: 'absolute', left: `${left + width}px`, top: `${top}px` }}
        >
            <div data-testid="tooltip-placeholder"></div>
            {isVisible && (
                <div
                    className={`${styles.tooltipContent} ${styles[position]}`}
                    data-testid="tooltip-content"
                >
                    <span className={styles.arrow}></span>
                    {title}
                    <div className={styles['align-center']}>
                        <button className={styles['button-secondary']} onClick={prev}>previous</button>
                        <button className={styles['button-primary']} onClick={next}>next</button>
                    </div>
                </div>
            )}
        </div>
    )
}

Tooltip.defaultProps = {
    position: 'right'
};

const propTypes = {
    title: PropTypes.string.isRequired,
    position: PropTypes.string,
    visible: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};

Tooltip.propTypes = propTypes;

export default Tooltip;
