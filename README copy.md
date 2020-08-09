# react-user-onboarding

> A reactjs component library for user on-boarding or user flows

[![NPM](https://img.shields.io/npm/v/react-user-onboarding.svg)](https://www.npmjs.com/package/react-user-onboarding) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

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

import { UserOnboarding } from 'react-user-onboarding'
import 'react-user-onboarding/dist/index.css'

const Example = () => {
  return (
    <div>
      <UserOnboarding 
        config={config} 
        isVisible={isVisible} 
        onClose={() => setIsVisible(false)} 
      />
    </div>
  )
}
```

## License

MIT © [JohnDamilola](https://github.com/JohnDamilola)
