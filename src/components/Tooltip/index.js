import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.modules.css';

const Tooltip = ({ index, setIndex, selectedData, maxLength, title, position, isVisible }) => {
    const node = useRef();

    const isInRange = (x) => {
        const min = 0;
        const max = maxLength - 1;
        return x >= min && x <= max;
    }

    const prev = () => {
        if (isInRange(index - 1)) {
            current.style.zIndex = 0;
            document.body.removeChild(overlay)
            setIndex(index - 1);
        }
    }

    const next = () => {
        if (isInRange(index + 1)) {
            current.style.zIndex = 0;
            document.body.removeChild(overlay)
            setIndex(index + 1);
        }
    }

    const { ref: { current } } = selectedData;
    const elementDimensions = current && current.getBoundingClientRect();
    const { left, right, top, width, height } = elementDimensions || [];

    current.style.zIndex = 999;
    var overlay = document.createElement("section");
    document.body.prepend(overlay);
    return (
        <div className={styles.container}
            data-testid="tooltip"
            ref={node}
            className="exclude"
            style={{ position: 'absolute', background: 'transparent', left: `${left}px`, width: `${width}px`, height: `${height}px`, top: `${top}px`, opacity: 1 }}
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
