import './App.css'
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Activities from './components/Activities';

function App() {


  return (
    <>
    <Router>
    <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
        
      </Routes>
     
     </Router>
    </>
  )
}

export default App
