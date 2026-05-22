import ResourcePage from './ResourcePage.jsx'

export default function Users() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users/`
    : '/api/users/'
  return <ResourcePage title="Users" endpoint={endpoint} />
}
