/*!
 * UserOnboarding JavaScript Library v1.1
 * author : John Damilola @johndamilola
 * desc: A reactjs component library for user on-boarding or user flows
 * license : MIT
 */

import React, { useState } from 'react';
import Modal from './components/Modal';
import PropTypes from 'prop-types';
import Tooltip from './components/Tooltip';


/*
* TODO:
* Capture escape key and navigation keys
*/

const UserOnboarding = ({ config, isVisible, onClose }) => {
  const [index, setIndex] = useState(0);
  
  const selectedData = config.tour[index];
  return (
    <div>
      {
        selectedData.component === 'modal'
        ? <Modal
            intro={selectedData.intro || false}
            index={index}
            setIndex={setIndex}
            maxLength={config.tour.length}
            isVisible={isVisible} 
            onClose={onClose}>
              {selectedData.children}
          </Modal>
        : selectedData.component === 'tooltip'
          ? <Tooltip
              index={index}
              selectedData={selectedData}
              setIndex={setIndex}
              maxLength={config.tour.length}
              isVisible={isVisible} 
              onClose={onClose}
              title={selectedData.children} />
          : null
      }
    </div>
  )  
}

UserOnboarding.propTypes = {
  config: PropTypes.object.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

UserOnboarding.defaultProps = {
  isVisible: false
}

export default UserOnboarding;
