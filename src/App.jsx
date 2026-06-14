import React from 'react'
import Nav from './components/Nav/Nav.jsx'
import Hero from './components/Hero/Hero.jsx'
import Manifesto from './components/Manifesto/Manifesto.jsx'
import PriorityAccess from './components/PriorityAccess/PriorityAccess.jsx'
import Showcase from './components/Showcase/Showcase.jsx'

export default function App() {
  return (
    <>
      {/* <Nav /> */}
      <Hero />
      <Showcase />
      <Manifesto />
      <PriorityAccess />
    </>
  )
}
