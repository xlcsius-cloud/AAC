import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';
import Layout from './components/Layout';
import Home from './pages/Home';
import UserInterface from './pages/UserInterface';
import AdminInterface from './pages/AdminInterface';
import IconsView from './pages/IconsView';
import KeyboardView from './pages/KeyboardView';

function App() {
  const initialize = useStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="user" element={<UserInterface />}>
            <Route index element={<Navigate to="icons" replace />} />
            <Route path="icons" element={<IconsView />} />
            <Route path="keyboard" element={<KeyboardView />} />
          </Route>
          <Route path="admin" element={<AdminInterface />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
