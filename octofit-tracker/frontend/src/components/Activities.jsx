import ResourcePage from './ResourcePage.jsx'

export default function Activities() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : '/api/activities/'
  return <ResourcePage title="Activities" endpoint={endpoint} />
}
