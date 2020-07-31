import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.modules.css';

const Tooltip = ({ index, setIndex, selectedData, maxLength, title, isVisible }) => {
    const node = useRef();
    const tooltipNode = useRef();
    const [tooltipDimension, setTooltipDimension] = useState();

    useEffect(() => {
        if (tooltipNode.current && !tooltipDimension) {
            const { offsetWidth, offsetHeight } = tooltipNode.current || [];
            setTooltipDimension({ offsetWidth, offsetHeight });
        }
    }, [tooltipNode])

    const isInRange = (x) => {
        const min = 0;
        const max = maxLength - 1;
        return x >= min && x <= max;
    }

    const prev = () => {
        if (isInRange(index - 1)) {
            removeOverlay();
            setIndex(index - 1);
        }
    }

    const next = () => {
        if (isInRange(index + 1)) {
            removeOverlay();
            setIndex(index + 1);
        }
    }

    const removeOverlay = () => {
        var overlays = document.getElementsByTagName("section");
        for (let overlay of overlays) {
            document.body.removeChild(overlay)
        }
        current.style.zIndex = 0;
    }

    const generateTooltipStyle = (elementDimensions) => {
        const { left, right, bottom, top, width, height } = elementDimensions || [];
        const { scrollWidth: bodyScrollWidth, scrollHeight: bodyScrollHeight } = document.body;
        
        const { offsetWidth: tooltipWidth, offsetHeight: tooltipHeight } = tooltipDimension || [];

        let position;
        if (bodyScrollWidth < right + tooltipWidth) {
            position = 'left';
        } else if (bodyScrollHeight < bottom + tooltipHeight) {
            position = 'top'; 
        } else {
            position = 'right'
        }
        return [{ 
            position: 'absolute', background: 'transparent', left: `${left}px`, width: `${width}px`, height: `${height}px`, top: `${top}px`, opacity: 1 
        }, position]
    }
    
    const { ref: { current } } = selectedData;
    const elementDimensions = current && current.getBoundingClientRect();
    
    current.style.zIndex = 999;
    var existingOverlays = document.getElementsByTagName("section");
    var overlay;
    if (existingOverlays.length === 0) {
        overlay = document.createElement("section");
        overlay.style.width = document.body.scrollWidth + 'px';
        overlay.style.height = document.body.scrollHeight + 'px';
        document.body.prepend(overlay);
    }
    const [style, tooltipPosition] = generateTooltipStyle(elementDimensions);
    return (
        <div className={styles.container}
            data-testid="tooltip"
            ref={node}
            className="exclude"
            style={style}
        >
            <div data-testid="tooltip-placeholder"></div>
            {isVisible && (
                <div
                    ref={tooltipNode}
                    className={`${styles.tooltipContent} ${styles[tooltipPosition]}`}
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

const propTypes = {
    title: PropTypes.object.isRequired,
    isVisible: PropTypes.bool.isRequired
};

Tooltip.propTypes = propTypes;

export default Tooltip;
