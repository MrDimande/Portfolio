// Minimal Pages Router error page to prevent Next.js from falling back to internal _error.js
// This file is required for App Router projects to avoid the "<Html> should not be imported" error

function Error({ statusCode }) {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#050510',
      color: '#fff'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '4rem', 
          fontWeight: 'bold',
          color: '#00ffff'
        }}>
          {statusCode || 'Error'}
        </h1>
        <p style={{ color: '#9ca3af' }}>
          {statusCode === 404
            ? 'Página não encontrada'
            : statusCode === 500
            ? 'Erro interno do servidor'
            : 'Ocorreu um erro'}
        </p>
        <a 
          href="/"
          style={{
            display: 'inline-block',
            marginTop: '20px',
            padding: '12px 24px',
            border: '1px solid #00ffff',
            borderRadius: '8px',
            color: '#00ffff',
            textDecoration: 'none'
          }}
        >
          Voltar ao Início
        </a>
      </div>
    </div>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
