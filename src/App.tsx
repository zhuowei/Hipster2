import './App.css';
import LoginPage from './LoginPage';
import SearchUserPage from './SearchUserPage';
import SearchClubPage from './SearchClubPage';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Route path="/login" component={LoginPage} />
      <Route path="/search/user" component={SearchUserPage} />
      <Route path="/search/club" component={SearchClubPage} />
    </Router>
  );
}

export default App;
