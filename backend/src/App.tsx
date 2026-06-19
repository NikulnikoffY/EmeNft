import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TonConnectProvider } from './contexts/TonConnectContext';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';

// Placeholder components for other pages
const MintPage = () => (
  <div className="min-h-screen bg-gray-50 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Mint NFT Collection</h1>
        <p className="text-gray-600">Mint page coming soon...</p>
      </div>
    </div>
  </div>
);

const ListPage = () => (
  <div className="min-h-screen bg-gray-50 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">List NFT for Sale</h1>
        <p className="text-gray-600">List page coming soon...</p>
      </div>
    </div>
  </div>
);

const CollectionPage = () => (
  <div className="min-h-screen bg-gray-50 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">View Collection</h1>
        <p className="text-gray-600">Collection page coming soon...</p>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <TonConnectProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/mint" element={<MintPage />} />
            <Route path="/list" element={<ListPage />} />
            <Route path="/collection" element={<CollectionPage />} />
            <Route path="/collection/:address" element={<CollectionPage />} />
          </Routes>
        </Layout>
      </Router>
    </TonConnectProvider>
  );
}

export default App;
