import { useEffect } from "react";

// This is a bridge component to show the static HTML site
// Since we are in a React environment, we'll just redirect or 
// use a simple layout if needed, but the user wants STATIC HTML.
// I will modify the vite config to serve static files if needed,
// but for now, the user can see index.html directly via the server.

function App() {
  useEffect(() => {
    // We are serving the index.html directly from the client root
    // This React app is just a placeholder because Replit expects a React entry
    // but the user's focus is the static files I just created.
  }, []);

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      fontFamily: 'sans-serif',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1>WordPress Style Static Theme</h1>
      <p>Aapki theme files (index.html, style.css, script.js) ready hain.</p>
      <p style={{ color: '#666' }}>Aap in files ko kisi bhi code editor mein asani se change kar sakte hain.</p>
      <div style={{ marginTop: '20px' }}>
        <a href="/index.html" style={{
          padding: '10px 20px',
          background: '#6366f1',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px'
        }}>View Theme Live</a>
      </div>
    </div>
  );
}

export default App;
