import Container from "@mui/material/Container";
import { Route, Routes } from 'react-router-dom';

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { AppRouter } from './routes/AppRouter';

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <AppRouter />
        {/* <Routes>
          <Route path='/' element={<Home />} />
        </Routes> */}
      </Container>
    </>
  );
}

export default App;
