import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import Demo from './pages/Demo'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Homepage/>}/>
        <Route path='/demo' element={<Demo/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
