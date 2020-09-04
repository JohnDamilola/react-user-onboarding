## react-user-onboarding 
> ✨ A React Component library for **User Onboarding** (guided tour or explanation walkthrough) on your web application to **increase usage** and **reduce churn rate of users** upon first interaction.

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/JohnDamilola/react-user-onboarding#readme)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/JohnDamilola/react-user-onboarding/graphs/commit-activity)
[![License: MIT](https://img.shields.io/github/license/JohnDamilola/react-user-onboarding)](https://github.com/JohnDamilola/react-user-onboarding/blob/master/LICENSE)
[![Twitter: johndamilola](https://img.shields.io/twitter/follow/johndamilola.svg?style=social)](https://twitter.com/johndamilola)

##### [Demo](https://johndamilola.github.io/react-user-onboarding) | [Documentation](https://github.com/JohnDamilola/react-user-onboarding) | [Issues](https://github.com/JohnDamilola/react-user-onboarding/issues)

## Install

```bash
npm install react-user-onboarding
```

```bash
yarn add react-user-onboarding
```

## Usage

```jsx
import React, { Component } from 'react'

import UserOnboarding from 'react-user-onboarding'
import 'react-user-onboarding/dist/index.css'

const tooltip1 = useRef();
const story = [
  {
    component: 'modal',
    intro: true,
    children: (
      // Html component for initial modal goes here
    )
  },
  {
    component: 'tooltip',
    ref: tooltip1,
    children: (
      // Html component for tooltip goes here
    )
  },
  {
    component: 'speech-bubble',
    children: (
      // Html component for speech-bubble goes here
    )
  },
  {
    component: 'modal',
    intro: false,
    children: (
      // Html component for last modal goes here
    )
  }
]

const Example = () => {
  return (
    <div>
      <UserOnboarding 
        story={story} 
        isVisible={isVisible} 
        onClose={() => setIsVisible(false)} 
      />
    </div>
  )
}
```

## UserOnboarding API

|Name     |Description                                    |Type                          |Default|
|---------|-----------------------------------------------|------------------------------|-------|
|story    |the story object for the onboarding flow       |array<[object](https://johndamilola.github.io/react-user-onboarding#story-object)>|       |
|isVisible|value used to toggle the component's visibility|boolean                       |false  |
|onClose  |function to close the component                |function                      |       |

#### Story Object

|Name     |Description                                      |Type     |Component       |
|---------|-------------------------------------------------|---------|--------------|
|component|indicate the type of component (modal, tooltip, speech-bubble)  |string   |modal, tooltip, speech-bubble|
|intro    |value to indicate the first onboarding step      |boolean  |modal         |
|ref      |ref to store the target node for the tooltip     |React Ref|tooltip       |
|children |the html content of the modals, tooltips and speech bubble |ReactNode|modal, tooltip|
|className|a css class name to style the modals, tooltips and speech bubble |string|modal, tooltip, speech-bubble|

**Modal Object Example**
```jsx
    {
        component: 'modal',
        intro: true,
        children: (<div>modal content goes here</div>)
    }
```
**Tooltip Object Example**
```jsx
    {
        component: 'tooltip',
        ref: loginFormRef,
        children: (<div>tooltip content goes here</div>)
    }
```
**Speech Bubble Object Example**
```jsx
    {
        component: 'speech-bubble',
        ref: loginFormRef,
        children: (<div>tooltip content goes here</div>)
    }
```

## Author

👤 **John Damilola** (made with ❤️)

* Website: johndamilola.github.io
* Twitter: [@johndamilola](https://twitter.com/johndamilola)
* Github: [@JohnDamilola](https://github.com/JohnDamilola)
* LinkedIn: [@johndamilola](https://linkedin.com/in/johndamilola)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/JohnDamilola/react-user-onboarding/issues). You can also take a look at the [contributing guide](https://github.com/JohnDamilola/react-user-onboarding/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!


## 📝 License

Copyright © 2020 [John Damilola](https://github.com/JohnDamilola).

This project is [MIT](https://github.com/JohnDamilola/react-user-onboarding/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_