import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "./pages/HomePage.tsx";
import { QuestPage } from "./pages/QuestPage";
import { AuthorizationPage } from "./pages/AuthorizationPage.tsx";
import { LogInPage } from "./pages/LogInPage.tsx";
import { SingUpPage } from "./pages/SignUpPage.tsx";
import { UserPage } from "./pages/UserPage.tsx";
import { NotFoundPage } from "./pages/NotFoundPage";
import './App.css';
import { ContextProvider } from "./contexts/ContextProvider.tsx";

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/quest" element={<QuestPage />} />

          <Route path="/authorization" element={<AuthorizationPage />}>
            <Route path="login" element={<LogInPage />} />
            <Route path="signup" element={<SingUpPage />} />
          </Route>

          <Route path="/user/" element={<UserPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider >
  );
}

export default App;
