import React, { useState, useRef } from 'react';

import { UserOnboarding } from 'react-user-onboarding'
import 'react-user-onboarding/dist/index.css'
import './index.css';

const App = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [index, setIndex] = useState(0);
  const elem1 = useRef();
  const elem2 = useRef();
  const config = {
    tour: [
      {
        component: 'modal',
        tooltipID: '#getStarted',
        verticalPosition: 'center',
        horizontalPosition: 'center',
        intro: true,
        children: (
          <div>
            <p>Hi Damilola!</p>

            <p>Welcome to React User Onboarding Demo App. This is a sample illustration of how the library can be implemented in your existing web apps.</p>

            <p>Would you like to have a tour to see how it works? (If you skip, you can click the "show tour" button to get started again)</p>
          </div>
        )
      },
      {
        component: 'tooltip',
        tooltipID: '#tooltip1',
        ref: elem1,
        children: (
          <div>
            <p>This is slide 2/3.</p>
          </div>
        )
      },
      {
        component: 'tooltip',
        tooltipID: '#tooltip2',
        ref: elem2,
        children: (
          <div>
            <p>This is slide 3/3.</p>
          </div>
        )
      },
      {
        component: 'modal',
        tooltipID: '#getStarted',
        verticalPosition: 'center',
        horizontalPosition: 'center',
        intro: false,
        children: (
          <div>
            <p>Thanks Damilola!</p>

            <p>You have now come to the end of the onboarding demo.</p>
          </div>
        )
      }
    ]
  }
  return (
    <>
      <button className="button-start" onClick={() => setIsVisible(true)}>Begin Onboarding Tour</button>
      <button id="tooltip1" ref={elem1} value="2">First Element</button>
      <button id="tooltip2" ref={elem2} value="2">Second Element</button>
      <UserOnboarding beginFrom={0} config={config} isVisible={isVisible} onClose={() => setIsVisible(false)} />
    </>
  )
}

export default App
