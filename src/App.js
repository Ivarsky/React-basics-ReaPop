import AdvertsPage from './components/adverts/AdvertsPage';
import './App.css';
import Button from './components/shared/Button';

function App() {
  return (
    <div className="App">
      <AdvertsPage/>
      <Button onClick={(event) => console.log(event)}>Click me!</Button>
    </div>);
}

export default App;
