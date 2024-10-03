import Header from './components/Header';
import Router from './components/Router';

function App() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateRows: 'auto 1fr auto',
      minHeight: '100vh',
    }}>

      <Header />
      <Router style={{
        padding: '20px',
        overflowY: 'auto',
        overflowX: 'hidden',
        height: '100%',
      }}/>
      <footer style={{
        bottom: '0',
        width: '100%',
        textAlign: 'center',
      }}>
        <hr />
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
        }}>
          <p><a href="https://www.linkedin.com/in/chander-shekhar-vishwakarma?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">Linkedin</a></p>
          <p><a href="https://github.com/RundownHammer/">GitHub</a></p>
        </div>
      </footer>
    </div>
  )
}
export default App