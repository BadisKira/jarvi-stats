import './App.css'
import PageStatistics from './pages/statistiques';
import { Route, Routes } from 'react-router-dom';
import PageHome from './pages/home';
import RootLayout from './router/layout';

function App() {

  return (
    <Routes>
      <Route path="/" element={<PageHome />} />
      <Route path='dashboard' element={<RootLayout />}>
        <Route index element={<PageStatistics />} />
      </Route>
    </Routes>
  )
}

export default App
