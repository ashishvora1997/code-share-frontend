import { useState } from 'react';
import api from '../lib/api/axiosInstance';
import { Code, Share2, Loader2 } from 'lucide-react';

interface NewShareProps {
  onShareCreated: (shareId: string) => void;
}

export function NewShare({ onShareCreated }: NewShareProps) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateShare = async () => {
    if (!code.trim()) {
      setError('Please enter some code to share');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data } = await api.post('/snippets', { code });

      if (data) {
        onShareCreated(data.id);
      }
    } catch (err) {
      setError('Failed to create share. Please try again.');
      console.error('Error creating share:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Code className="w-12 h-12 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Code Share</h1>
          <p className="text-slate-400">Create and share code snippets instantly. Links expire in 24 hours.</p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-slate-700/50 overflow-hidden">
          <div className="p-6">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here..."
              className="w-full h-96 bg-slate-900/50 text-slate-100 font-mono text-sm p-4 rounded-lg border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none resize-none"
            />

            {error && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleCreateShare}
              disabled={loading || !code.trim()}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Share...
                </>
              ) : (
                <>
                  <Share2 className="w-5 h-5" />
                  Create Shareable Link
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
