import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FrontPage from "./Pages/FrontPage/frontpage";
import NotFound from "./Pages/NotFoundPage/notfound";
import Nav from "./Pages/FrontPage/Nav";
import DnWpage from "./Pages/DnWPage/Dnwpage";
import Blockpage from "./Pages/BlockPage/BlockPage";
import TransactionPage from "./Pages/TransactionPage/TransactionPage";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/dnw/:id" element={<DnWpage />} />
        <Route path="/block/:id" element={<Blockpage />} />
        <Route path="/transaction/:id" element={<TransactionPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
