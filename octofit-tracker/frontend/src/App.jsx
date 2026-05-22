import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : '/api'

  return (
    <main className="app-shell container-fluid py-4">
      <div className="mx-auto app-shell__content">
        <header className="mb-4">
          <h1 className="display-6 fw-semibold mb-2">OctoFit Tracker</h1>
          <p className="text-body-secondary mb-3">
            Multi-tier fitness dashboard for users, activities, teams, workouts, and leaderboard views.
          </p>
          <p className="small mb-0">
            API base: <span className="badge text-bg-light border">{apiBaseUrl}</span>
          </p>
          {!codespaceName && (
            <div className="alert alert-warning mt-3 mb-0" role="alert">
              <strong>VITE_CODESPACE_NAME is not set.</strong> Using a safe local fallback (<code>/api</code>)
              instead of a Codespaces URL.
            </div>
          )}
        </header>

        <nav className="nav nav-pills flex-wrap gap-2 mb-4" aria-label="OctoFit sections">
          <NavLink
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            to="/activities"
          >
            Activities
          </NavLink>
          <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/users">
            Users
          </NavLink>
          <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/teams">
            Teams
          </NavLink>
          <NavLink
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            to="/leaderboard"
          >
            Leaderboard
          </NavLink>
          <NavLink
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            to="/workouts"
          >
            Workouts
          </NavLink>
        </nav>

        <section className="card shadow-sm border-0">
          <div className="card-body">
            <Routes>
              <Route path="/" element={<Navigate to="/activities" replace />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/users" element={<Users />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/workouts" element={<Workouts />} />
              <Route path="*" element={<Navigate to="/activities" replace />} />
            </Routes>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
