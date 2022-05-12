import { Route, Routes } from "../node_modules/react-router-dom/index";
import LoginPage from "./pages/LoginPage";
import PostListPage from "./pages/PostListPage";
import PostPage from "./pages/PostPage";
import RegisterPage from "./pages/RegisterPage";
import WritePage from "./pages/WritePage";


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<PostListPage />} />
        <Route path='/@:userName' element={<PostListPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/@:userName/:postId" element={<PostPage />} />
      </Routes>
    </>
  );
}

export default App;
