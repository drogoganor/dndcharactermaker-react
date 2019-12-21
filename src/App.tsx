import React from 'react';
import './App.css';
import DndCharacterMakerComponent from './components/dnd/dnd';
import DndProps from './components/dnd/dndprops';

const App: React.FC = () => {
  var props = new DndProps();

  return (
    <div className="App">
      <header className="App-header">
        <DndCharacterMakerComponent {...props} />
      </header>
    </div>
  );
}

export default App;
