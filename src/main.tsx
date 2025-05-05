import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Web3Provider } from './components/XellarProvider'

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <Web3Provider>
      <App />
    </Web3Provider>
  );
}
