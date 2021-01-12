import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    window.api.quitApp();
  }

  const handleGetProducts = async () => {
    const data = await window.api.getProducts();
    setProducts(data);
  }

  return (
    <div className="App">
      <header className="App-header">
        {
          products.length !== 0 && products.map(item => (
            <h1>{item.name}</h1>
          ))
        }
        <button
          onClick={handleClick}
        >
          Quit App
          </button>
        <button
          onClick={handleGetProducts}
        >
          Get Products
        </button>
      </header>
    </div >
  );
}

export default App;
