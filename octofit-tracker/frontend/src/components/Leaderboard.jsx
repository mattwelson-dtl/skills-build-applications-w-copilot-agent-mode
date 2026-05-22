import ResourcePage from './ResourcePage.jsx'

export default function Leaderboard() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : '/api/leaderboard/'
  return <ResourcePage title="Leaderboard" endpoint={endpoint} />
}
