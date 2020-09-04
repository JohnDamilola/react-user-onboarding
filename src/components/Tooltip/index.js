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
const Tooltip = ({ index, setIndex, selectedData, maxLength, title, isVisible, onClose }) => {
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
        current.style.removeProperty('z-index')
        if (isInRange(index - 1)) {
            setIndex(index - 1);
        } else {
            onCloseAndReset();
        }
    }

    const next = () => {
        current.style.removeProperty('z-index')
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

    const computePosition = () => {
        const { left, right, bottom, top } = getElemDistance(current) || [];
        const { scrollWidth: bodyScrollWidth, scrollHeight: bodyScrollHeight } = document.body;

        const { offsetWidth: tooltipWidth, offsetHeight: tooltipHeight } = tooltipDimension || [];

        let position;

        const cond1 = bodyScrollWidth < right + tooltipWidth;
        const cond2 = bodyScrollHeight < bottom + tooltipHeight;
        const cond3 = left < tooltipWidth;
        const cond4 = top < tooltipHeight;

        console.log(cond1, cond2, cond3, cond4);

        if (!cond2) {
            position = 'bottom';
        } else if ((cond3 && !cond1) || !cond1) {
            position = 'right';
        } else if (cond1 && !cond3) {
            position = 'left';
        } else if (cond2 && !cond4) {
            position = 'top';
        } else if (cond1 && !cond2 && !cond3 && !cond4) {
            position = 'center';
        } else {
            position = 'center'
        }

        return position;
    }

    const generateTooltipStyle = (elementDimensions) => {
        const { width, height } = elementDimensions || [];
        let { top, left, bottom } = getElemDistance(current) || [];
        const position = computePosition();
        const viewPortHeight = document.documentElement.clientHeight;

        // if (viewPortHeight < top) {
        //     top = viewPortHeight - (bottom - top);
        // }

        return [{
            position: 'absolute', background: 'transparent', left: `${left}px`, width: `${width}px`, height: `${height}px`, top: `${top}px`, opacity: 1
        }, position]
    }

    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    const scrollToRef = (current) => {
        const { top: elemTop } = getElemDistance(current);
        const { height } = tooltipNodeRef.current.getBoundingClientRect() || [];

        
        const tooltipTop = parseInt(elemTop - height);
        
        if (!isInViewport(current)) {
            window.scrollTo(0, tooltipTop)
        }
    }   

    const { ref: { current } } = selectedData;

    const reCalculateDimensions = useCallback(() => {
        const dimensions = current && current.getBoundingClientRect();
        setElementDimensions(dimensions)

        // scrollToRef(current);
        // const [style, tooltipPosition] = elementDimensions 
        //     ? generateTooltipStyle(elementDimensions) 
        //     : [];
        // setTooltipStyles([style, tooltipPosition])
    });
    
    useEffect(() => {
        let body = document.body, 
            html = document.documentElement;

        let fullDocumentHeight = Math.max( body.scrollHeight, body.offsetHeight, 
            html.clientHeight, html.scrollHeight, html.offsetHeight );

        let fullDocumentWidth = Math.max( body.scrollWidth, body.offsetWidth, 
            html.clientWidth, html.scrollWidth, html.offsetWidth );

        // console.log( body.scrollWidth, body.offsetWidth, 
            // html.clientWidth, html.scrollWidth, html.offsetWidth )

        if (isInRange(index)) {
            current.style.zIndex = 999;
            var existingOverlays = document.getElementsByTagName("section");
            var overlay;
            if (existingOverlays.length === 0 && !hasRemovedOverlay) {
                overlay = document.createElement("section");
                overlay.style.overflow = 'scroll';
                overlay.style.width = document.body.scrollWidth + 'px';
                overlay.style.height = fullDocumentHeight + 'px';
                document.body.prepend(overlay);
            }
            calculateDimensions();
            // scrollToRef(current);
        }
    }, [index])

    const checkKey = useCallback((e) => {
        e = e || window.event;
        const { keyCode } = e;

        if ([38, 39].includes(keyCode)) { // up and right arrow keys
            // console.log("Forward Keys");
            next();
        } else if ([40, 37].includes(keyCode)) { // down and left arrow keys
            // console.log("Back Keys");
            prev();
        } else if (keyCode === 27) { // escape key
            // console.log("Cancel Keys");
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
        scrollToRef(current);
    }, [elementDimensions])

    const [style, tooltipPosition] = tooltipStyles;
    // console.log(tooltipStyles);
    return (
        <div className={styles.container}
            data-testid="tooltip"
            ref={nodeRef}
            className="exclude"
            style={style}
        >
            <div data-testid="tooltip-placeholder"></div>
            {isVisible && (
                <div
                    ref={tooltipNodeRef}
                    className={`${styles.tooltipContent} ${styles[tooltipPosition]}`}
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

Tooltip.propTypes = {
    index: PropTypes.number.isRequired,
    setIndex: PropTypes.func.isRequired,
    selectedData: PropTypes.object.isRequired,
    maxLength: PropTypes.number.isRequired,
    title: PropTypes.object.isRequired,
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default Tooltip;
