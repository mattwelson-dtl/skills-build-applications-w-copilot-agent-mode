import ResourcePage from './ResourcePage.jsx'

export default function Workouts() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : '/api/workouts/'
  return <ResourcePage title="Workouts" endpoint={endpoint} />
}
