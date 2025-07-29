import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import PublicLayout from "./layouts/PublicLayout";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import { StoreContext } from "./components/context/StoreContext";
import Study from "./components/Study";
import Create from "./components/Create";
import Decks from "./components/Decks";

const App = () => {

  const {isAppReady} = useContext(StoreContext);

  if(!isAppReady) return null;

  return (
    <div className=" w-screen min-h-screen">
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route element={<PublicLayout />}>
            <Route index element={<HomePage />} />
          </Route>

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path="study" element={<Study/>} />
            <Route path="create" element={<Create/>} />
            <Route path="decks" element={<Decks/>} />
          </Route>

          
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
