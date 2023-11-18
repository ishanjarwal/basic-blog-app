import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Login from "./components/Login";
import Register from "./components/Register";
import MainLayout from "./Layouts/MainLayout";
import PostList from "./components/PostList";
import Create from './components/Create'
import Post from './components/Post'
import { UserContextProvider } from "./contexts/UserContext";


function App() {
  return (
    <UserContextProvider>
      <main className="w-100">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<PostList />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/create" element={<Create />}></Route>
            <Route path="/post/:id" element={<Post />}></Route>
          </Route>
        </Routes>
      </main>
    </UserContextProvider>
  );
}

export default App;
