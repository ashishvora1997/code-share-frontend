import { useState, useEffect } from 'react';
import { NewShare } from './components/NewShare';
import { ShareEditor } from './components/ShareEditor';

function App() {
  const [currentShareId, setCurrentShareId] = useState<string | null>(null);

  useEffect(() => {
    const path = window.location.pathname;
    const shareIdMatch = path.match(/^\/([a-f0-9-]{36})$/);

    if (shareIdMatch) {
      setCurrentShareId(shareIdMatch[1]);
    } else {
      setCurrentShareId(null);
    }

    const handlePopState = () => {
      const path = window.location.pathname;
      const shareIdMatch = path.match(/^\/([a-f0-9-]{36})$/);

      if (shareIdMatch) {
        setCurrentShareId(shareIdMatch[1]);
      } else {
        setCurrentShareId(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleShareCreated = (shareId: string) => {
    const url = `/${shareId}`;
    window.history.pushState({}, '', url);
    setCurrentShareId(shareId);
  };

  const handleGoHome = () => {
    window.history.pushState({}, '', '/');
    setCurrentShareId(null);
  };

  if (currentShareId) {
    return <ShareEditor shareId={currentShareId} onGoHome={handleGoHome} />;
  }

  return <NewShare onShareCreated={handleShareCreated} />;
}

export default App;
