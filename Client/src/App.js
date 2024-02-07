import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from './components/login';
import AddTask from './components/addTask';
import Comming from './components/comming';
import TaskList from './components/tasksListComp';
import Carousel from './components/carouselImage';
import { Routes, Route } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Comming />}></Route>
          <Route path="/addTask" element={<AddTask />}></Route>
          <Route path="/comming" element={<Comming />}></Route>
          <Route path="/tasksListComp" element={<TaskList />}></Route>
          <Route path="/carouselImage" element={<Carousel />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
