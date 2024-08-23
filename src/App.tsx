import { Route, Routes } from 'react-router-dom';
import { NotFound } from './pages/404';
import { Home } from './pages/Home';
import MemberDetail from './pages/MemberDetail';
import Members from './pages/Members';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/members" element={<Members />} />
        <Route path="/members/:id" element={<MemberDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
