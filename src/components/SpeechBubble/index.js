import React, { useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import useEventListener from './../../hooks/use-event-listener';
import styles from './styles.modules.css';
import getElemDistance from '../../utils/element-distance';

/**
 * The tooltip component of the onboarding flow
 * @param {object} props Component props
 * @param {number} props.index the position of the tooltip in the onboarding flow story object
 * @param {function} props.setIndex function to set the value of the index
 * @param {object} props.selectedData object data with this particular index
 * @param {number} props.maxLength the total number of steps in the onboarding flow
 * @param {object} props.title component displayed in the tooltip
 * @param {bool} props.isVisible value used to toggle the component's visibility
 * @param {function} props.onClose function to close the component
 * @returns {JSX.Element} Component template
 */
const SpeechBubble = ({ index, setIndex, selectedData, maxLength, title, isVisible, onClose }) => {
    const nodeRef = useRef(null);
    const tooltipNodeRef = useRef(null);
    const [tooltipDimension, setTooltipDimension] = useState(null);
    const [elementDimensions, setElementDimensions] = useState(null);
    const [tooltipStyles, setTooltipStyles] = useState([null, ""]);
    const [hasRemovedOverlay, setHasRemovedOverlay] = useState(false);

    useEffect(() => {
        if (tooltipNodeRef.current && !tooltipDimension) {
            const { offsetWidth, offsetHeight } = tooltipNodeRef.current || [];
            setTooltipDimension({ offsetWidth, offsetHeight });
        }
    }, [tooltipNodeRef]);

    const isInRange = (x) => {
        const min = 0;
        const max = maxLength - 1;
        return x >= min && x <= max;
    }

    const calculateDimensions = () => {
        const dimensions = current && current.getBoundingClientRect();
        setElementDimensions(dimensions)
    }

    const prev = () => {
        current.style.zIndex = 0;
        if (isInRange(index - 1)) {
            setIndex(index - 1);
        } else {
            onCloseAndReset();
        }
    }

    const next = () => {
        current.style.zIndex = 0;
        if (isInRange(index + 1)) {
            setIndex(index + 1);
        } else {
            onCloseAndReset();
        }
    }

    const onCloseAndReset = () => {
        removeOverlay();
        onClose();
        setIndex(0);
    }

    const removeOverlay = () => {
        var overlays = document.getElementsByTagName("section");
        for (let overlay of overlays) {
            document.body.removeChild(overlay)
        }
        current.style.zIndex = 0;
    }

    const computePosition = (elementDimensions) => {
        const { left, right, bottom, top } = getElemDistance(current) || [];
        const { scrollWidth: bodyScrollWidth, scrollHeight: bodyScrollHeight } = document.body;

        const { offsetWidth: tooltipWidth, offsetHeight: tooltipHeight } = tooltipDimension || [];

        let position;

        console.log(bodyScrollWidth, right, tooltipWidth, elementDimensions.right)

        const cond1 = bodyScrollWidth < right + tooltipWidth;
        const cond2 = bodyScrollHeight < bottom + tooltipHeight;
        const cond3 = left < tooltipWidth;
        const cond4 = top < tooltipHeight;

        console.log(cond1, cond2, cond3, cond4)
        if ((cond3 && !cond1) || !cond1) {
            position = 'right';
        } else if (cond1 && !cond3) {
            position = 'left';
        } else if (cond2 && !cond4) {
            position = 'top';
        } else if (cond4 && !cond2) {
            position = 'bottom';
        } else if (cond1 && !cond2 && !cond3 && !cond4) {
            position = 'center';
        } else {
            position = 'center'
        }

        console.log(position)

        return position;
    }

    const generateTooltipStyle = (elementDimensions) => {
        const { width, height } = elementDimensions || [];
        const { top, left } = getElemDistance(current) || [];
        const position = computePosition(elementDimensions);

        return [{
            position: 'absolute', background: 'transparent', left: `${left}px`, width: `${width}px`, height: `${height}px`, top: `${top}px`, opacity: 1
        }, position]
    }

    const { ref: { current } } = selectedData;

    const reCalculateDimensions = useCallback(() => {
        const dimensions = current && current.getBoundingClientRect();
        setElementDimensions(dimensions)
    });
    
    useEffect(() => {
        if (isInRange(index)) {
            current.style.zIndex = 999;
            var existingOverlays = document.getElementsByTagName("section");
            var overlay;
            if (existingOverlays.length === 0 && !hasRemovedOverlay) {
                overlay = document.createElement("section");
                overlay.style.width = document.body.scrollWidth + 'px';
                overlay.style.height = document.body.scrollHeight + 'px';
                document.body.prepend(overlay);
            }
            calculateDimensions();
        }
    }, [index])

    const checkKey = useCallback((e) => {
        e = e || window.event;
        const { keyCode } = e;

        if ([38, 39].includes(keyCode)) { // up and right arrow keys
            console.log("Forward Keys");
            next();
        } else if ([40, 37].includes(keyCode)) { // down and left arrow keys
            console.log("Back Keys");
            prev();
        } else if (keyCode === 27) { // escape key
            console.log("Cancel Keys");
            removeOverlay();
            setHasRemovedOverlay(true)
            onCloseAndReset();
        }
    });

    // Add event listener for keydown and resize
    useEventListener('keydown', checkKey);
    useEventListener('resize', reCalculateDimensions);

    useEffect(() => {
        const [style, tooltipPosition] = elementDimensions ? generateTooltipStyle(elementDimensions) : [];
        setTooltipStyles([style, tooltipPosition])
    }, [elementDimensions])

    const [style, tooltipPosition] = tooltipStyles;
    // const [style, tooltipPosition] = elementDimensions ? generateTooltipStyle(elementDimensions) : [];
    return (
        <div className={styles.container}
            data-testid="tooltip"
            ref={nodeRef}
            className="exclude"
            style={{width: '100px', height: '100px', position: 'absolute', bottom: 0, left: 0}}
        >
            <div data-testid="tooltip-placeholder">
                <img className={styles.bubble} src="https://cdn4.iconfinder.com/data/icons/avatar-circle-1-1/72/6-512.png" />
            </div>
            {isVisible && (
                <div
                    ref={tooltipNodeRef}
                    className={`${styles.tooltipContent} ${styles["top"]}`}
                    data-testid="tooltip-content"
                >
                    <span className={styles.arrow}></span>
                    {title}
                    <div className={styles['align-center']}>
                        <button className={styles['button-secondary']} onClick={prev}>Prev</button>
                        <button className={styles['button-primary']} onClick={next}>Next</button>
                    </div>
                </div>
            )}
        </div>
    )
}

SpeechBubble.propTypes = {
    index: PropTypes.number.isRequired,
    setIndex: PropTypes.func.isRequired,
    selectedData: PropTypes.object.isRequired,
    maxLength: PropTypes.number.isRequired,
    title: PropTypes.object.isRequired,
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default SpeechBubble;
