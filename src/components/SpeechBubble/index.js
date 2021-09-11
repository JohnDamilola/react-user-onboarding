import React, { useRef, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import useEventListener from './../../hooks/use-event-listener'
import styles from './styles.modules.css'
import getElemDistance from '../../utils/element-distance'
import CancelIcon from '../../assets/img/cancel.svg'

/**
 * The SpeechBubble component of the onboarding flow
 * @param {object} props Component props
 * @param {number} props.index the position of the tooltip in the onboarding flow story object
 * @param {function} props.setIndex function to set the value of the index
 * @param {number} props.maxLength the total number of steps in the onboarding flow
 * @param {object} props.title component displayed in the tooltip
 * @param {bool} props.isVisible value used to toggle the component's visibility
 * @param {function} props.onClose function to close the component
 * @returns {JSX.Element} Component template
 */
const SpeechBubble = ({
  index,
  setIndex,
  maxLength,
  className,
  title,
  isVisible,
  onClose
}) => {
  const nodeRef = useRef(null)
  const [hasRemovedOverlay, setHasRemovedOverlay] = useState(false)

  const isInRange = (x) => {
    const min = 0
    const max = maxLength - 1
    return x >= min && x <= max
  }

  const prev = () => {
    if (isInRange(index - 1)) {
      setIndex(index - 1)
    } else {
      onCloseAndReset()
    }
  }

  const next = () => {
    if (isInRange(index + 1)) {
      setIndex(index + 1)
    } else {
      onCloseAndReset()
    }
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
  }

  useEffect(() => {
    if (isInRange(index)) {
      var existingOverlays = document.getElementsByTagName('section')
      var overlay
      if (existingOverlays.length === 0 && !hasRemovedOverlay) {
        overlay = document.createElement('section')
        overlay.style.width = document.body.scrollWidth + 'px'
        overlay.style.height = document.body.scrollHeight + 'px'
        document.body.prepend(overlay)
      }
      const current = nodeRef && nodeRef.current
      if (current) {
        scrollToRef(current)
      }
    }
  }, [index, nodeRef])

  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  const scrollToRef = (current) => {
    const { top } = getElemDistance(current)
    const { offsetHeight } = current

    console.log(top, offsetHeight)
    if (!isInViewport(current)) {
      window.scrollTo(0, top)
    }
  }

  const checkKey = useCallback((e) => {
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
    }
  })

  // Add event listener for keydown and resize
  useEventListener('keydown', checkKey)
  return (
    <div
      className={styles.container}
      data-testid='tooltip'
      style={{
        width: '100px',
        height: '100px',
        position: 'fixed',
        bottom: 0,
        left: 0,
        zIndex: 999
      }}
    >
      <div data-testid='tooltip-placeholder'>
        <img
          className={styles.bubble}
          style={{ bottom: `${window.innerHeight + window.screenY} px` }}
          src='https://cdn4.iconfinder.com/data/icons/avatar-circle-1-1/72/6-512.png'
        />
      </div>
      {isVisible && (
        <div
          ref={nodeRef}
          className={`${styles.tooltipContent} ${styles['top']}`}
          data-testid='tooltip-content'
        >
          <div className={styles.cancel}>
            <img src={CancelIcon} alt='cancel' onClick={onClose} />
          </div>
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

SpeechBubble.propTypes = {
  index: PropTypes.number.isRequired,
  setIndex: PropTypes.func.isRequired,
  maxLength: PropTypes.number.isRequired,
  title: PropTypes.object.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default SpeechBubble
