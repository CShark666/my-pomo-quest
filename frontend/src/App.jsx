import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "./pages/HomePage";
import { CreateQuestPage } from "./pages/CreateQuestPage";
import { QuestPage } from "./pages/QuestPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="quest/create" element={<CreateQuestPage />} />
        <Route path="quest/:id" element={<QuestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
