import React from 'react';
import './App.css';
import DndCharacterMakerComponent from './components/dnd';
import reduxStore from './redux/store';
import { Provider } from 'react-redux';

const { store } = reduxStore;

const App = () => {
  return (
      <Provider store={store}>
          <div className="App">
              <header className="App-header">
                  <DndCharacterMakerComponent />
              </header>
          </div>
      </Provider>
  );
};

export default App;
