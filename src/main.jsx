import React from 'react'
import ReactDOM from 'react-dom/client'

// Show loading message immediately
document.getElementById('root').innerHTML = '<div style="padding:20px;font-family:sans-serif;">Loading ESG Platform...</div>'

// Lazy load the app to catch import errors
async function loadApp() {
  try {
    const { BrowserRouter } = await import('react-router-dom')
    const { default: App } = await import('./App')
    await import('./index.css')

    class ErrorBoundary extends React.Component {
      constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
      }
      static getDerivedStateFromError(error) {
        return { hasError: true, error }
      }
      render() {
        if (this.state.hasError) {
          return (
            <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
              <h1>Something went wrong</h1>
              <pre style={{ color: 'red', whiteSpace: 'pre-wrap' }}>{this.state.error?.toString()}</pre>
              <pre style={{ color: 'gray', fontSize: '12px', whiteSpace: 'pre-wrap' }}>{this.state.error?.stack}</pre>
            </div>
          )
        }
        return this.props.children
      }
    }

    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <ErrorBoundary>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ErrorBoundary>
      </React.StrictMode>,
    )
  } catch (error) {
    document.getElementById('root').innerHTML = `
      <div style="padding:20px;font-family:sans-serif;">
        <h1 style="color:red;">Failed to load application</h1>
        <pre style="color:red;white-space:pre-wrap;">${error.toString()}</pre>
        <pre style="color:gray;font-size:12px;white-space:pre-wrap;">${error.stack || ''}</pre>
      </div>
    `
  }
}

loadApp()
