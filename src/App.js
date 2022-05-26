import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Alert from './components/Alert';


function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message="This is an alert!"/>
          <Routes>
            <Route exact path="/" element={<Home />}>
            </Route>
            <Route exact path="/about" element={<About />}>
            </Route>
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
