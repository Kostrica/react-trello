import React from 'react';
import './App.css';
import { TrelloApp } from './components/TrelloApp/TrelloApp';
import { Tooltip } from 'materialize-css';

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.tooltipped');
  var instances = Tooltip.init(elems);
});

function App() {
  return (
    <div className="App">
      <TrelloApp />
    </div>
  );
}

export default App;
