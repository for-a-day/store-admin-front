import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Main from './pages/main/Main';
import Menu from './pages/menu/Menu';
import Login from './pages/login/Login';
import Store from './pages/store/Store';
import { ThemeProvider } from '@mui/material/styles';
import { baseTheme } from './assets/global/Theme-variable';
import FullLayout from './layout/FullLayout';
import { PopupProvider  } from "./components/popup/PopupContext";

function App() {
  const theme = baseTheme;

  const [login, setLogin] = useState(false);

  useEffect(()=>{setLogin(localStorage.getItem('token'))}, [login]);

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
        <PopupProvider>
          <Routes>
            {!login ? (
              <Route path='/' element={<Login setLogin={setLogin}/>} />
            ) : (
              <Route path='/' element={<FullLayout setLogin={setLogin}/>}>
              <Route index element={<Main />} />
              <Route path='menu' element={<Menu />} />
              <Route path='store' element={<Store />} />
            </Route>
            )}
          </Routes>
          </PopupProvider>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
