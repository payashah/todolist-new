import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import TodoList from './Pages/TodoList/TodoList';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <TodoList></TodoList>
    </div>
  );
}

export default App;
