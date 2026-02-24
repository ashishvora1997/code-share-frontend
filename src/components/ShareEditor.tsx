import React from "react";
import { useState, useEffect, useCallback } from "react";
import api from "../lib/api/axiosInstance";
import {
  Code,
  Copy,
  Check,
  Clock,
  Home,
  AlertCircle,
  Loader2,
} from "lucide-react";

export interface CodeShare {
  id: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}

interface ShareEditorProps {
  shareId: string;
  onGoHome: () => void;
}

export const ShareEditor = ({ shareId, onGoHome }: ShareEditorProps) => {
  const [share, setShare] = useState<CodeShare | null>(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [expiresAtTime, setExpiresAtTime] = useState<string | null>(null);

  useEffect(() => {
    if (!expiresAtTime) return;

    const updateTimer = () => {
      const expiresAt = new Date(expiresAtTime);
      const now = new Date();
      const diff = expiresAt.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("Expired");
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s remaining`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [expiresAtTime]);

  const loadShare = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get(`/snippets/${shareId}`);

      if (!data) {
        setError("Share not found or has expired");
      } else {
        setShare(data);
        setCode(data.code);
        setExpiresAtTime(data.expiresAt);
      }
    } catch (err) {
      setError("Failed to load share");
      console.error("Error loading share:", err);
    } finally {
      setLoading(false);
    }
  }, [shareId]);

  useEffect(() => {
    if (shareId) {
      loadShare();
    }
  }, [loadShare, shareId]);

  const handleSave = async () => {
    if (!share) return;

    setSaving(true);
    setError("");

    try {
      await api.put(`/snippets/${shareId}`, { code });

      setShare({ ...share, code });
    } catch (err) {
      setError("Failed to save changes");
      console.error("Error saving share:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleCopyLink = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading share...</p>
        </div>
      </div>
    );
  }

  if (error && !share) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Share Not Found
          </h2>
          <p className="text-slate-400 mb-6">
            This share may have expired or doesn't exist.
          </p>
          <button
            onClick={onGoHome}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 inline-flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Create New Share
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Code className="w-8 h-8 text-blue-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">Shared Code</h1>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Clock className="w-4 h-4" />
                {timeLeft}
              </div>
            </div>
          </div>
          <div className="flex gap-2 self-start">
            <div className="relative group">
              <button
                onClick={handleCopyLink}
                className="bg-slate-700 hover:bg-slate-600 text-white 
                   p-2 sm:px-4 sm:py-2 rounded-lg 
                   transition-all duration-200 
                   flex items-center justify-center gap-2"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}

                <span className="hidden sm:inline">
                  {copied ? "Copied!" : "Copy Link"}
                </span>
              </button>

              <div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 
                      opacity-0 group-hover:opacity-100 
                      bg-black text-white text-xs px-2 py-1 
                      rounded-md whitespace-nowrap 
                      transition-opacity duration-200 sm:hidden"
              >
                {copied ? "Copied!" : "Copy Link"}
              </div>
            </div>

            <div className="relative group">
              <button
                onClick={onGoHome}
                className="bg-slate-700 hover:bg-slate-600 text-white 
                   p-2 sm:px-4 sm:py-2 rounded-lg 
                   transition-all duration-200 
                   flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />

                <span className="hidden sm:inline">New Share</span>
              </button>

              <div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 
                      opacity-0 group-hover:opacity-100 
                      bg-black text-white text-xs px-2 py-1 
                      rounded-md whitespace-nowrap 
                      transition-opacity duration-200 sm:hidden"
              >
                New Share
              </div>
            </div>
          </div>
          {/* <div className="flex gap-2">
            <button
              onClick={handleCopyLink}
              className="bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Link
                </>
              )}
            </button>
            <button
              onClick={onGoHome}
              className="bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              New Share
            </button>
          </div> */}
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-slate-700/50 overflow-hidden">
          <div className="p-6">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Your code here..."
              className="w-full h-[calc(100vh-280px)] bg-slate-900/50 text-slate-100 font-mono text-sm p-4 rounded-lg border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none resize-none"
            />

            {error && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleSave}
              disabled={saving || code === share?.code}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/20"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ShareEditor);
