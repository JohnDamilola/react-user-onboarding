import React, { useRef, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.modules.css'

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
const Tooltip = ({
  index,
  setIndex,
  selectedData,
  maxLength,
  title,
  isVisible,
  onClose
}) => {
  const nodeRef = useRef(null)
  const tooltipNodeRef = useRef(null)
  const [tooltipDimension, setTooltipDimension] = useState(null)
  const [hasRemovedOverlay, setHasRemovedOverlay] = useState(false)
  const [hasSetEventListener, setEventListener] = useState(false)

  useEffect(() => {
    if (tooltipNodeRef.current && !tooltipDimension) {
      const { offsetWidth, offsetHeight } = tooltipNodeRef.current || []
      setTooltipDimension({ offsetWidth, offsetHeight })
    }
  }, [tooltipNodeRef])

  const isInRange = (x) => {
    const min = 0
    const max = maxLength - 1
    return x >= min && x <= max
  }

  const prev = () => {
    removeOverlay()
    // document.addEventListener("keydown", checkKey, false);
    console.log('PREV Checking...', isInRange(index - 1))
    if (isInRange(index - 1)) {
      setIndex(index - 1)
    } else {
      onCloseAndReset()
    }
    setEventListener(false)
    document.removeEventListener('keydown', checkKey, false)
  }

  const next = () => {
    removeOverlay()
    // document.addEventListener("keydown", checkKey, false);
    console.log('NEXT Checking...', isInRange(index + 1))
    if (isInRange(index + 1)) {
      setIndex(index + 1)
    } else {
      onCloseAndReset()
    }
    setEventListener(false)
    document.removeEventListener('keydown', checkKey, false)
  }

  const onCloseAndReset = () => {
    removeOverlay()
    onClose()
    setIndex(0)
  }

  const removeOverlay = () => {
    var overlays = document.getElementsByTagName('section')
    for (const overlay of overlays) {
      document.body.removeChild(overlay)
    }
    if (current) {
      current.style.zIndex = 0
    }
  }

  const computePosition = (elementDimensions) => {
    const { left, right, bottom, top } = elementDimensions || []
    const {
      scrollWidth: bodyScrollWidth,
      scrollHeight: bodyScrollHeight
    } = document.body

    const { offsetWidth: tooltipWidth, offsetHeight: tooltipHeight } =
      tooltipDimension || []

    let position

    const cond1 = bodyScrollWidth < right + tooltipWidth
    const cond2 = bodyScrollHeight < bottom + tooltipHeight
    const cond3 = left < tooltipWidth
    const cond4 = top < tooltipHeight

    if (cond1 && !cond2 && !cond3 && !cond4) {
      position = 'center'
    } else if (cond1 && !cond3) {
      position = 'left'
    } else if (cond2 && !cond4) {
      position = 'top'
    } else if ((cond3 && !cond1) || !cond1) {
      position = 'right'
    } else if (cond4 && !cond2) {
      position = 'bottom'
    } else {
      position = 'center'
    }

    return position
  }

  const generateTooltipStyle = (elementDimensions) => {
    const { top, width, height, left } = elementDimensions || []

    const position = computePosition(elementDimensions)

    return [
      {
        position: 'absolute',
        background: 'transparent',
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
        top: `${top}px`,
        opacity: 1
      },
      position
    ]
  }

  const {
    ref: { current }
  } = selectedData
  const elementDimensions = current && current.getBoundingClientRect()

  useEffect(() => {
    if (isInRange(index) && current) {
      current.style.zIndex = 999
      var existingOverlays = document.getElementsByTagName('section')
      var overlay
      if (existingOverlays.length === 0 && !hasRemovedOverlay) {
        overlay = document.createElement('section')
        overlay.style.width = document.body.scrollWidth + 'px'
        overlay.style.height = document.body.scrollHeight + 'px'
        document.body.prepend(overlay)
      }
    }
  }, [index])

  const checkKey = (e) => {
    e = e || window.event
    const { keyCode } = e

    if ([38, 39].includes(keyCode)) {
      // up and right arrow keys
      console.log('Forward Keys')
      next()
    } else if ([40, 37].includes(keyCode)) {
      // down and left arrow keys
      console.log('Back Keys')
      prev()
    } else if (keyCode === 27) {
      // escape key
      console.log('Cancel Keys')
      removeOverlay()
      setHasRemovedOverlay(true)
      onCloseAndReset()
      setEventListener(false)
      document.removeEventListener('keydown', checkKey, false)
    }
  }

  // useEffect(() => {
  //     if (!hasSetEventListener) {
  //         document.addEventListener("keydown", checkKey, false);
  //         setEventListener(true);
  //     }
  // }, [hasSetEventListener])

  useEffect(() => {
    document.addEventListener('keydown', checkKey, false)
    setEventListener(true)
  })

  const [style, tooltipPosition] = generateTooltipStyle(elementDimensions)
  console.log(hasRemovedOverlay, hasSetEventListener)
  return (
    <div
      className={styles.container}
      data-testid='tooltip'
      ref={nodeRef}
      style={style}
    >
      <div data-testid='tooltip-placeholder' />
      {isVisible && (
        <div
          ref={tooltipNodeRef}
          className={`${styles.tooltipContent} ${styles[tooltipPosition]}`}
          data-testid='tooltip-content'
        >
          <span className={styles.arrow} />
          {title}
          <div className={styles['align-center']}>
            <button className={styles['button-secondary']} onClick={prev}>
              Prev
            </button>
            <button className={styles['button-primary']} onClick={next}>
              Next
            </button>
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
}

export default Tooltip
