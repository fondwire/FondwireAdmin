import React, { useState} from 'react';
import './App.css';
import Preloader from "./utils/preloader/preloader";
import {useRoute} from "./router";
import {BrowserRouter as Router} from "react-router-dom";

function App() {
  const [pending, setPending] = useState(true)
  const route = useRoute(true)


  setTimeout(()=>{setPending(false)}, 2000)

  if (pending) return <Preloader />
  return <Router><div className="App">{route}</div></Router>
}

export default App;
