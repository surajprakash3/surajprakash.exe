import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, RefreshCw, ExternalLink, CheckCircle, AlertCircle, X, Check } from 'lucide-react';
import * as coderService from '../../services/coderService';

const ManageCodingPlatforms = () => {
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncingId, setSyncingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    platformKey: '',
    username: '',
    profileUrl: '',
    color: '#38bdf8',
    order: 0,
    isActive: true,
    source: 'manual',
    stats: {
      totalSolved: 0,
      easy: 0,
      medium: 0,
      hard: 0,
      rating: 0,
      globalRank: '',
      repositories: 0,
      contributions: 0,
      stars: 0
    }
  });

  const fetchPlatforms = async () => {
    try {
      setLoading(true);
      const data = await coderService.getAllPlatformsAdmin();
      setPlatforms(data);
    } catch (err) {
      alert(err.message || 'Failed to fetch platforms');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlatforms();
  }, []);

  const handleEdit = (p) => {
    setEditingId(p._id);
    setFormData({
      name: p.name || '',
      platformKey: p.platformKey || '',
      username: p.username || '',
      profileUrl: p.profileUrl || '',
      color: p.color || '#38bdf8',
      order: p.order || 0,
      isActive: p.isActive !== false,
      source: p.source || 'manual',
      stats: {
        totalSolved: p.stats?.totalSolved || 0,
        easy: p.stats?.easy || 0,
        medium: p.stats?.medium || 0,
        hard: p.stats?.hard || 0,
        rating: p.stats?.rating || 0,
        globalRank: p.stats?.globalRank || '',
        repositories: p.stats?.repositories || 0,
        contributions: p.stats?.contributions || 0,
        stars: p.stats?.stars || 0
      }
    });
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingId(null);
    setFormData({
      name: '',
      platformKey: '',
      username: '',
      profileUrl: '',
      color: '#38bdf8',
      order: platforms.length + 1,
      isActive: true,
      source: 'manual',
      stats: {
        totalSolved: 0,
        easy: 0,
        medium: 0,
        hard: 0,
        rating: 0,
        globalRank: '',
        repositories: 0,
        contributions: 0,
        stars: 0
      }
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await coderService.updatePlatform(editingId, formData);
      } else {
        await coderService.createPlatform(formData);
      }
      setShowModal(false);
      fetchPlatforms();
    } catch (err) {
      alert(err.message || 'Error saving platform');
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name}?`)) {
      try {
        await coderService.deletePlatform(id);
        fetchPlatforms();
      } catch (err) {
        alert(err.message || 'Error deleting platform');
      }
    }
  };

  const handleSync = async (id, name) => {
    try {
      setSyncingId(id);
      await coderService.syncPlatform(id);
      alert(`Successfully synchronized ${name}!`);
      fetchPlatforms();
    } catch (err) {
      alert(err.message || `Failed to sync ${name}`);
    } finally {
      setSyncingId(null);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black font-heading text-white">Coding Platforms</h1>
          <p className="text-xs text-slate-400 mt-1">Manage connected platforms, credentials, and real-time statistics</p>
        </div>

        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
        >
          <Plus size={16} />
          Add Platform
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-500 font-mono">Loading platforms...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {platforms.map(p => (
            <div
              key={p._id}
              className="p-5 rounded-2xl bg-[#0b1329] border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span 
                      className="w-3.5 h-3.5 rounded-full" 
                      style={{ backgroundColor: p.color || '#38bdf8' }} 
                    />
                    <h3 className="text-base font-bold text-white">{p.name}</h3>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    p.isActive 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                  }`}>
                    {p.isActive ? 'Active' : 'Disabled'}
                  </span>
                </div>

                <p className="text-xs font-mono text-slate-400 mb-3">@{p.username || 'n/a'}</p>

                {/* Stats summary */}
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono space-y-1 mb-4">
                  {p.platformKey === 'github' ? (
                    <>
                      <div>Repos: <strong className="text-white">{p.stats?.repositories || 0}</strong></div>
                      <div>Contribs: <strong className="text-cyan-400">{p.stats?.contributions || 0}</strong></div>
                      <div>Stars: <strong className="text-amber-400">{p.stats?.stars || 0}</strong></div>
                    </>
                  ) : (
                    <>
                      <div>Solved: <strong className="text-white">{p.stats?.totalSolved || 0}</strong> (E:{p.stats?.easy || 0} M:{p.stats?.medium || 0} H:{p.stats?.hard || 0})</div>
                      {p.stats?.rating && <div>Rating: <strong className="text-purple-400">{p.stats?.rating}</strong></div>}
                    </>
                  )}
                  <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800">
                    Source: <span className="text-cyan-400">{p.source}</span> • Status: {p.syncStatus}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => handleSync(p._id, p.name)}
                  disabled={syncingId === p._id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-300 disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw size={12} className={syncingId === p._id ? 'animate-spin' : ''} />
                  Sync API
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEdit(p)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                    title="Edit"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(p._id, p.name)}
                    className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-950/40"
                    title="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit/Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#0b1329] border border-slate-700 p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold font-heading text-white">
                {editingId ? 'Edit Coding Platform' : 'Add New Coding Platform'}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Platform Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                    placeholder="e.g. LeetCode"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Platform Key (slug)</label>
                  <input
                    type="text"
                    required
                    value={formData.platformKey}
                    onChange={(e) => setFormData({ ...formData, platformKey: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                    placeholder="e.g. leetcode, github"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Username / Handle</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                    placeholder="e.g. Sp_alphatech"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Profile URL</label>
                  <input
                    type="url"
                    value={formData.profileUrl}
                    onChange={(e) => setFormData({ ...formData, profileUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Theme Color</label>
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full h-9 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Active Status</label>
                  <select
                    value={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                  >
                    <option value="true">Active (Visible)</option>
                    <option value="false">Disabled (Hidden)</option>
                  </select>
                </div>
              </div>

              {/* Statistics Fields */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
                  Manual Verified Statistics
                </h4>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Total Solved</label>
                    <input
                      type="number"
                      value={formData.stats.totalSolved}
                      onChange={(e) => setFormData({ ...formData, stats: { ...formData.stats, totalSolved: Number(e.target.value) } })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-emerald-400 mb-1">Easy</label>
                    <input
                      type="number"
                      value={formData.stats.easy}
                      onChange={(e) => setFormData({ ...formData, stats: { ...formData.stats, easy: Number(e.target.value) } })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-amber-400 mb-1">Medium</label>
                    <input
                      type="number"
                      value={formData.stats.medium}
                      onChange={(e) => setFormData({ ...formData, stats: { ...formData.stats, medium: Number(e.target.value) } })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-rose-400 mb-1">Hard</label>
                    <input
                      type="number"
                      value={formData.stats.hard}
                      onChange={(e) => setFormData({ ...formData, stats: { ...formData.stats, hard: Number(e.target.value) } })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Contest Rating</label>
                    <input
                      type="number"
                      value={formData.stats.rating}
                      onChange={(e) => setFormData({ ...formData, stats: { ...formData.stats, rating: Number(e.target.value) } })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Global Rank / Division</label>
                    <input
                      type="text"
                      value={formData.stats.globalRank}
                      onChange={(e) => setFormData({ ...formData, stats: { ...formData.stats, globalRank: e.target.value } })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Repositories / Contribs</label>
                    <input
                      type="number"
                      value={formData.stats.repositories}
                      onChange={(e) => setFormData({ ...formData, stats: { ...formData.stats, repositories: Number(e.target.value) } })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-lg"
                >
                  Save Platform
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCodingPlatforms;
