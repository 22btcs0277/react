import logo from './logo.svg';
import './App.css';
import Join from './Component/Join/Join';
import Chat from './Component/Chat/Chat';
import Message from './Component/Message/Message';
import { Route,Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">

          <Routes>
            <Route path='/' element={<Join/>}/>
            <Route path='/Chat' element={<Chat/>}/>
            <Route path='/Message' element={<Message/>}/>
          </Routes>


      
    
      </header>
    </div>
  );
}

export default App;
