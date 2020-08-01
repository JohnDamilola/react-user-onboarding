import React, { useState, useRef } from 'react';

import UserOnboarding from 'react-user-onboarding'
import 'react-user-onboarding/dist/index.css'
import './index.css';

const App = () => {
  const [isVisible, setIsVisible] = useState(false);
  const todayTasks1 = [
    {
      title: "Get feedback to Stacy about designs",
      description: "",
      urgency: 1,
      status: "pending",
      deadline: "July 28th"
    }
  ]
  const todayTasks2 = [
    {
      title: "Finalize Q2 review & Q3 strategic planning",
      description: "",
      urgency: 2,
      status: "pending",
      deadline: "July 28th"
    },
    {
      title: "Read the Eisenhower Matrix guide",
      description: "",
      urgency: 2,
      status: "pending",
      deadline: "July 28th"
    }
  ]
  const todayTasks3 = [
    {
      title: "Pick a venue for end-of-summer celebration",
      description: "",
      urgency: 3,
      status: "pending",
      deadline: "July 28th"
    }
  ]
  const todayTasks4 = [
    {
      title: "Respond to Kyle's email about travel recommendations",
      description: "",
      urgency: 4,
      status: "pending",
      deadline: "July 28th"
    }
  ]
  const elem1 = useRef();
  const elem2 = useRef();
  const elem3 = useRef();
  const elem4 = useRef();
  const elem5 = useRef();
  const config = {
    tour: [
      {
        component: 'modal',
        intro: true,
        children: (
          <div>
            <p>Hi <b>Damilola</b> <span role="img" aria-label="hello">👋</span></p>

            <p>Welcome to React User Onboarding Demo App. This is a sample illustration of how the library can be implemented in your existing web apps.</p>

            <p>Would you like to have a tour to see how it works? (If you skip, you can click the "show tour" button to get started again)</p>
          </div>
        )
      },
      {
        component: 'tooltip',
        ref: elem1,
        children: (
          <div>
            <p>Click on this button to add a task</p>
          </div>
        )
      },
      {
        component: 'tooltip',
        ref: elem2,
        children: (
          <div>
            <p>Click on this space to show only "Important & Urgent" tasks.</p>
          </div>
        )
      },
      {
        component: 'tooltip',
        ref: elem3,
        children: (
          <div>
            <p>Click on this space to show only "Important" tasks.</p>
          </div>
        )
      },
      {
        component: 'tooltip',
        ref: elem4,
        children: (
          <div>
            <p>Click on this space to show only "Urgent" tasks.</p>
          </div>
        )
      },
      {
        component: 'tooltip',
        ref: elem5,
        children: (
          <div>
            <p>Click on this space to show only "Not Important & Not Urgent" tasks.</p>
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
    <div className="app-container">
      <div className="intro">
        <div>
          <h2>Hello Damilola! <span role="img" aria-label="hello">👋</span></h2>
          <h1>Get your priorities right with too-doo!</h1>
          <p>The most effective to-do app you'll ever need. Inspired by Eisenhower.
            </p>
          <button className="button-start" onClick={() => setIsVisible(true)}>Quick Onboarding Tour</button>
        </div>
      </div>
      <div className="apps">
        <div className="col-1 app-left" ref={elem1}>
          <form>
            <input placeholder="Search today tasks" />
          </form>
          <h2>What <u>today</u> is like for you.</h2>
          <div className="todo-list">
            <p>URGENT & IMPORTANT</p>
            {
              todayTasks1.map(({title, urgency}, i) => {
                return (
                  <div className={`todo-list-item urgency${urgency}`} key={i}>
                    <p>{title}</p>
                  </div>
                )
              })
            }
            <p>IMPORTANT</p>
            {
              todayTasks2.map(({title, urgency}, i) => {
                return (
                  <div className={`todo-list-item urgency${urgency}`} key={i}>
                    <p>{title}</p>
                  </div>
                )
              })
            }
            <p>URGENT</p>
            {
              todayTasks3.map(({title, urgency}, i) => {
                return (
                  <div className={`todo-list-item urgency${urgency}`} key={i}>
                    <p>{title}</p>
                  </div>
                )
              })
            }
            <p>NOT URGENT & NOT IMPORTANT</p>
            {
              todayTasks4.map(({title, urgency}, i) => {
                return (
                  <div className={`todo-list-item urgency${urgency}`} key={i}>
                    <p>{title}</p>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="col-1 app-right">
          <div className="row-3">
            <div className="col-5 bg-pink box" ref={elem2}>
              <h1>02</h1>
              <p>Important And Urgent</p>
            </div>
            <div className="col-1 bg-yellow box" ref={elem3}>
              <p className="small rotate-90"><span className="bigger">05</span> Important but Not Urgent</p>
            </div>
          </div>
          <div className="row-1">
            <div className="col-1 bg-green box" ref={elem4}>
              <p className="small">Not Important and Urgent</p>
              <p className="small">02</p>
            </div>
            <div className="col-1 bg-blue box" ref={elem5}>
              <p className="small">Not Important and Not Urgent</p>
              <p className="small">02</p>
            </div>
            <button className="btn-fab" ref={elem2}>
              <img alt="btn-plus" src={require('./img/plus.svg')} />
            </button>
          </div>
        </div>
      </div>
      <UserOnboarding 
        config={config} 
        isVisible={isVisible} 
        onClose={() => setIsVisible(false)} 
      />
    </div>
  )
}

export default App
