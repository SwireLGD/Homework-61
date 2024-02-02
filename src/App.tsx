import { useState } from 'react'
import CountryList from './Components/CountryList/CountryList'

function App() {
  return (
    <div>
      <CountryList onSelect={function (code: string): void {
        throw new Error('Function not implemented.')
      } } />
    </div>
  )
}

export default App
