import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import AppGuide from "./pages/AppGuide";
import PageNotFound from "./pages/PageNotFound";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./pages/AppLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/app" element={<AppLayout />}>
          <Route index element={<p>destination</p>} />
          <Route path="destinations" element={<p>destination</p>} />
          <Route path="countries" element={<p>countries</p>} />
          <Route path="form" element={<p>Form</p>} />
        </Route>

        <Route path="/blog" element={<BlogPage />} />
        <Route path="/how-to-use" element={<AppGuide />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
