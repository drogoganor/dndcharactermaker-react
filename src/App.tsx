import React from 'react';
import './App.css';
import DndCharacterMakerComponent from './components/dnd/dnd';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <DndCharacterMakerComponent />
      </header>
    </div>
  );
}

export default App;
