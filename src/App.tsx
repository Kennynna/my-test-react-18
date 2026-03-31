import "./App.css";
import { Toaster } from "react-hot-toast";
import { PrivateRoute } from "./components/PrivateRoute";
import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";
import { Route, Routes } from "react-router";

function App() {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/login" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
