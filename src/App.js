import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Company from './components/pages/Company';
import NewProject from './components/pages/NewProject';
import Navbar from './components/layout/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={ <Home /> } />
        <Route exact path='/contact' element={ <Contact /> } />
        <Route exact path='/company' element={ <Company /> } />
        <Route exact path='/newproject' element={ <NewProject /> } />
      </Routes>
    </Router>
  )
}

export default App;
