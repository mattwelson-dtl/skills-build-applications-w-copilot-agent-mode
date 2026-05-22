import ResourcePage from './ResourcePage.jsx'

export default function Teams() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : '/api/teams/'
  return <ResourcePage title="Teams" endpoint={endpoint} />
}
