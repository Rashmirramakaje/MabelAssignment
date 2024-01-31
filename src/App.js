import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MovieList from './components/MovieList';
import CharacterList from './components/CharacterList';
import './styles.css'; 

function App() {
  return (
    <div className='App'>
    <Router>
      <Switch>
        <Route path="/" exact component={MovieList} />
        <Route path="/movie/:id" component={CharacterList} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
