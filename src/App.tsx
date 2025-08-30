import { useState } from 'react'
import { Introduction } from './components/sections/Introduction'
import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Skills } from './components/sections/Skills'
import { Projects } from './components/sections/Projects'
import { Experience } from './components/sections/Experience'
import { Contact } from './components/sections/Contact'

function App() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Introduction onComplete={() => setIntroComplete(true)} />
      <div className={`transition-opacity duration-1000 ${introComplete ? 'opacity-100' : 'opacity-0'}`}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </div>
    </div>
  )
}

export default App