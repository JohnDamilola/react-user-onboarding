import React, { useState, useEffect } from 'react';
import Modal from './components/Modal';
import PropTypes from 'prop-types';
import Tooltip from './components/Tooltip';
/*
* TODO:
* Speech bubble
* alleventlisteners on the highlighted node
*/

/**
 * A ReactJS component library for user on-boarding or user flows
 * @param {object} props Component props
 * @param {array} props.story the story array for the onboarding flow
 * @param {bool} props.isVisible value used to toggle the component's visibility
 * @param {function} props.onClose function to close the component
 * @returns {JSX.Element} Component template
 */
const UserOnboarding = ({ story, isVisible, onClose }) => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible])

  const selectedData = story[index];

  return visible ? (
    <div>
      {
        selectedData.component === 'modal'
          ? <Modal
            intro={selectedData.intro || false}
            index={index}
            setIndex={setIndex}
            maxLength={story.length}
            isVisible={visible}
            onClose={onClose}>
            {selectedData.children}
          </Modal>
          : selectedData.component === 'tooltip'
            ? <Tooltip
              index={index}
              selectedData={selectedData}
              setIndex={setIndex}
              maxLength={story.length}
              isVisible={visible}
              onClose={onClose}
              title={selectedData.children} />
            : null
      }
    </div>
  ) : null
}

UserOnboarding.propTypes = {
  story: PropTypes.array.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

UserOnboarding.defaultProps = {
  isVisible: false
}

export default UserOnboarding;
