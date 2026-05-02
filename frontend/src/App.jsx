import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "./pages/HomePage";
import { CreateQuestPage } from "./pages/CreateQuestPage";
import { QuestPage } from "./pages/QuestPage";
import { NotFoundPage } from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/quest/create" element={<CreateQuestPage />} />
        <Route path="/quest/:id" element={<QuestPage />} />
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
