import {
BrowserRouter,
Routes,
Route,
} from 'react-router-dom';

import Dashboard from './Pages/Dashboard';
import LiveScore from './Pages/LiveScore';
import PlayoffsPage from './Pages/PlayoffsPage';
import PlayerStats from './components/PlayerStats';
import AwardsPage from './Pages/AwardsPage';

export default function App() {

return (


<BrowserRouter>

  <Routes>

    <Route
      path="/"
      element={<Dashboard />}
    />

    <Route
      path="/match/:id"
      element={<LiveScore />}
    />

    <Route
      path="/playoffs"
      element={<PlayoffsPage />}
    />

    <Route
      path="/player-stats"
      element={<PlayerStats />}
    />
    <Route
      path="/awards"
      element={<AwardsPage />}
    />

  </Routes>

</BrowserRouter>


);

}
