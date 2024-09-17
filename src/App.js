import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';

function App() {
  return (
    <Router>
    <Layout>
    
      <Routes>
        <Route path= "/" element={<Home/>}  />
        <Route path= "/login" element={<Login/>}  />
        <Route path= "/register" element={<Register/>}  />
      </Routes>
   
    </Layout>

    </Router>
  );
}

export default App;
