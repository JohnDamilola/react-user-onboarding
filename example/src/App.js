import React, { useState } from 'react';

import { UserOnboarding } from 'react-user-onboarding'
import 'react-user-onboarding/dist/index.css'
import './index.css';

const App = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [index, setIndex] = useState(0);
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
        tooltipID: '#getStarted',
        children: (
          <div>
            <p>Welcome to React User Onboarding Demo App. This is a sample illustration of how the library can be implemented in your existing web apps.</p>
          </div>
        )
      }
    ]
  }
  return (
    <>
      <button className="button-start" onClick={() => setIsVisible(true)}>Begin Onboarding Tour</button>
      <UserOnboarding beginFrom={0} config={config} isVisible={isVisible} onClose={() => setIsVisible(false)} />
    </>
  )
}

export default App
