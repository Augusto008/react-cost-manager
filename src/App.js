import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container from './components/layout/Container';
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Company from './components/pages/Company';
import NewProject from './components/pages/NewProject';
import Navbar from './components/layout/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass="min-height">
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/company' element={<Company />} />
          <Route exact path='/newproject' element={<NewProject />} />
        </Routes>
      </Container>
      <p>Footer</p>
    </Router>
  )
}

export default App;
