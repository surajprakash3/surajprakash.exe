import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, X } from 'lucide-react';
import * as coderService from '../../services/coderService';

const ManageDSAProgress = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    topic: '',
    category: 'Fundamental Structures',
    totalQuestions: 40,
    solvedQuestions: 0,
    easy: 0,
    medium: 0,
    hard: 0,
    status: 'In Progress',
    confidence: 80,
    notes: '',
    order: 0
  });

  const fetchTopics = async () => {
    try {
      setLoading(true);
      const data = await coderService.getDSAProgress();
      setTopics(data);
    } catch (err) {
      alert(err.message || 'Failed to fetch DSA topics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleEdit = (t) => {
    setEditingId(t._id);
    setFormData({
      topic: t.topic || '',
      category: t.category || 'Fundamental Structures',
      totalQuestions: t.totalQuestions || 40,
      solvedQuestions: t.solvedQuestions || 0,
      easy: t.easy || 0,
      medium: t.medium || 0,
      hard: t.hard || 0,
      status: t.status || 'In Progress',
      confidence: t.confidence || 80,
      notes: t.notes || '',
      order: t.order || 0
    });
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingId(null);
    setFormData({
      topic: '',
      category: 'Fundamental Structures',
      totalQuestions: 40,
      solvedQuestions: 0,
      easy: 0,
      medium: 0,
      hard: 0,
      status: 'In Progress',
      confidence: 80,
      notes: '',
      order: topics.length + 1
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await coderService.updateDSATopic(editingId, formData);
      } else {
        await coderService.createDSATopic(formData);
      }
      setShowModal(false);
      fetchTopics();
    } catch (err) {
      alert(err.message || 'Error saving DSA topic');
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete topic "${name}"?`)) {
      try {
        await coderService.deleteDSATopic(id);
        fetchTopics();
      } catch (err) {
        alert(err.message || 'Error deleting topic');
      }
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black font-heading text-white">DSA Curriculum & Progress</h1>
          <p className="text-xs text-slate-400 mt-1">Manage data structures, algorithms, solved problem counts, and confidence levels</p>
        </div>

        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
        >
          <Plus size={16} />
          Add DSA Topic
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-500 font-mono">Loading curriculum...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map(t => (
            <div
              key={t._id}
              className="p-5 rounded-2xl bg-[#0b1329] border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">{t.category}</span>
                    <h3 className="text-sm font-bold text-white">{t.topic}</h3>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    t.status === 'Mastered'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                  }`}>
                    {t.status}
                  </span>
                </div>

                <div className="text-xs text-slate-400 my-2">
                  <span>Solved: <strong className="text-white">{t.solvedQuestions}</strong> / {t.totalQuestions}</span>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden my-1.5">
                    <div 
                      style={{ width: `${(t.solvedQuestions / (t.totalQuestions || 1)) * 100}%` }} 
                      className="h-full bg-cyan-400 rounded-full"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
                  <span className="text-emerald-400">E:{t.easy || 0}</span>
                  <span className="text-amber-400">M:{t.medium || 0}</span>
                  <span className="text-rose-400">H:{t.hard || 0}</span>
                  <span>Confidence: {t.confidence || 80}%</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 mt-3 flex justify-end gap-2">
                <button
                  onClick={() => handleEdit(t)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <Edit2 size={15} />
                </button>
                <button
                  onClick={() => handleDelete(t._id, t.topic)}
                  className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-950/40"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit/Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#0b1329] border border-slate-700 p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingId ? 'Edit DSA Topic' : 'Add New DSA Topic'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Topic Name</label>
                <input
                  type="text"
                  required
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                  placeholder="e.g. Dynamic Programming (1D & 2D)"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Mastered">Mastered</option>
                    <option value="To Revise">To Revise</option>
                    <option value="Not Started">Not Started</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Total Target Problems</label>
                  <input
                    type="number"
                    value={formData.totalQuestions}
                    onChange={(e) => setFormData({ ...formData, totalQuestions: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Problems Solved</label>
                  <input
                    type="number"
                    value={formData.solvedQuestions}
                    onChange={(e) => setFormData({ ...formData, solvedQuestions: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-emerald-400 mb-1">Easy</label>
                  <input
                    type="number"
                    value={formData.easy}
                    onChange={(e) => setFormData({ ...formData, easy: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-amber-400 mb-1">Medium</label>
                  <input
                    type="number"
                    value={formData.medium}
                    onChange={(e) => setFormData({ ...formData, medium: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-rose-400 mb-1">Hard</label>
                  <input
                    type="number"
                    value={formData.hard}
                    onChange={(e) => setFormData({ ...formData, hard: Number(e.target.value) })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-xs font-bold text-slate-950"
                >
                  Save Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDSAProgress;
