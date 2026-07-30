import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "./pages/HomePage.tsx";
import { QuestPage } from "./pages/QuestPage";
import { AuthorizationPage } from "./pages/AuthorizationPage.tsx";
import { LogInPage } from "./pages/LogInPage.tsx";
import { SingUpPage } from "./pages/SignUpPage.tsx";
import { UserPage } from "./pages/UserPage.tsx";
import { NotFoundPage } from "./pages/NotFoundPage";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/quest" element={<QuestPage />} />

        <Route path="/authorization" element={<AuthorizationPage />} />
        <Route path="/authorization/login" element={<LogInPage />} />
        <Route path="/authorization/signup" element={<SingUpPage />} />

        <Route path="/user/" element={<UserPage />} />



        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
