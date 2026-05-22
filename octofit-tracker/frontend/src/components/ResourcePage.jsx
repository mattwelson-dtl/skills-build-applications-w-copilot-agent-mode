import { useEffect, useMemo, useState } from 'react'

function normalizeResponse(payload) {
  if (Array.isArray(payload)) {
    return { rows: payload, meta: null }
  }

  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.results)) {
      return { rows: payload.results, meta: payload }
    }

    if (Array.isArray(payload.data)) {
      return { rows: payload.data, meta: payload }
    }

    if (payload.data && typeof payload.data === 'object' && Array.isArray(payload.data.results)) {
      return { rows: payload.data.results, meta: payload.data }
    }
  }

  return { rows: [], meta: payload }
}

function getApiEndpoint(resourcePath) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : ''

  return `${baseUrl}${resourcePath}/`
}

export default function ResourcePage({ title, resourcePath }) {
  const endpoint = useMemo(() => getApiEndpoint(resourcePath), [resourcePath])
  const [rows, setRows] = useState([])
  const [meta, setMeta] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchResource() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(endpoint, { signal: controller.signal })

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        const normalized = normalizeResponse(payload)
        setRows(normalized.rows)
        setMeta(normalized.meta)
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Unexpected API error')
          setRows([])
          setMeta(null)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchResource()

    return () => {
      controller.abort()
    }
  }, [endpoint])

  const columns = useMemo(() => {
    const first = rows[0]

    if (!first || typeof first !== 'object' || Array.isArray(first)) {
      return ['value']
    }

    return Object.keys(first)
  }, [rows])

  return (
    <section>
      <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center gap-2 mb-3">
        <h2 className="h4 mb-0">{title}</h2>
        <span className="badge text-bg-light border text-break">{endpoint}</span>
      </div>

      {loading && <div className="alert alert-info mb-0">Loading data...</div>}

      {!loading && error && (
        <div className="alert alert-danger mb-0" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && rows.length === 0 && (
        <div className="alert alert-secondary mb-0">No data returned for this resource.</div>
      )}

      {!loading && !error && rows.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column} scope="col">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => {
                const rowKey =
                  typeof row === 'object' && row !== null
                    ? row.id ?? row._id ?? `${resourcePath}-${index}`
                    : `${resourcePath}-${index}`

                return (
                  <tr key={rowKey}>
                    {columns.map((column) => (
                      <td key={`${rowKey}-${column}`}>
                        {typeof row === 'object' && row !== null
                          ? String(row[column] ?? '')
                          : String(row)}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && meta && typeof meta === 'object' && !Array.isArray(meta) && (
        <div className="small text-body-secondary mt-3">
          {'count' in meta && <span className="me-3">Count: {String(meta.count)}</span>}
          {'next' in meta && <span className="me-3">Next: {String(meta.next)}</span>}
          {'previous' in meta && <span>Previous: {String(meta.previous)}</span>}
        </div>
      )}
    </section>
  )
}
