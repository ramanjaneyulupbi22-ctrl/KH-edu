import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  LogOut, Users, BookOpen, TrendingUp, Bell, Search,
  Eye, Trash2, Download, Filter, X, ChevronDown,
  CheckCircle, Phone, Mail, MapPin, Calendar, DollarSign,
  Clock, GraduationCap, FileText
} from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { Enquiry, ENQUIRY_STATUSES, STATUS_COLORS, EnquiryStatus } from '../../types';

/* ─── helpers ─── */
const fmt = (d: string) =>
  new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const PIE_COLORS = ['#1e3a8a','#f59e0b','#10b981','#ef4444','#6366f1','#ec4899','#06b6d4','#8b5cf6','#f97316'];

/* ─── StatusBadge ─── */
const StatusBadge: React.FC<{ status: EnquiryStatus }> = ({ status }) => (
  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUS_COLORS[status]}`}>
    {status}
  </span>
);

/* ─── InfoRow ─── */
const InfoRow: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-start gap-2.5">
    <span className="text-gray-400 mt-0.5">{icon}</span>
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm text-gray-700 font-medium">{value}</p>
    </div>
  </div>
);

/* ─── FilterChip ─── */
const FilterChip: React.FC<{ label: string; onRemove: () => void }> = ({ label, onRemove }) => (
  <span className="inline-flex items-center gap-1 bg-blue-50 text-navy-700 text-xs px-2.5 py-1 rounded-full">
    {label}
    <button onClick={onRemove} className="hover:text-red-500 ml-0.5"><X className="w-3 h-3" /></button>
  </span>
);

/* ─── Detail Modal ─── */
const DetailModal: React.FC<{
  enquiry: Enquiry;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<Enquiry>) => void;
}> = ({ enquiry, onClose, onUpdate }) => {
  const [status, setStatus] = useState<EnquiryStatus>(enquiry.status);
  const [notes, setNotes] = useState(enquiry.counsellorNotes || '');
  const [followUp, setFollowUp] = useState(enquiry.followUpDate || '');
  const [saved, setSaved] = useState(false);

  const save = () => {
    onUpdate(enquiry.id, { status, counsellorNotes: notes, followUpDate: followUp });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-gray-400 font-mono bg-gray-100 px-2 py-0.5 rounded">{enquiry.id}</span>
              <StatusBadge status={enquiry.status} />
            </div>
            <h2 className="text-lg font-bold text-gray-800">{enquiry.studentName}</h2>
            <p className="text-sm text-gray-500">Parent: {enquiry.parentName}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Contact Info</h3>
            <InfoRow icon={<Phone className="w-4 h-4"/>} label="Mobile" value={enquiry.mobile} />
            <InfoRow icon={<Mail className="w-4 h-4"/>} label="Email" value={enquiry.email || '—'} />
            <InfoRow icon={<MapPin className="w-4 h-4"/>} label="Location" value={`${enquiry.city}, ${enquiry.state}`} />
            <InfoRow icon={<Calendar className="w-4 h-4"/>} label="Submitted" value={fmt(enquiry.submittedAt)} />
          </div>

          {/* Academic */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Academic Details</h3>
            <InfoRow icon={<BookOpen className="w-4 h-4"/>} label="Course Interest" value={enquiry.preferredCourse} />
            <InfoRow icon={<GraduationCap className="w-4 h-4"/>} label="Qualification" value={enquiry.qualification} />
            <InfoRow icon={<DollarSign className="w-4 h-4"/>} label="Budget" value={enquiry.budget} />
            <InfoRow icon={<Clock className="w-4 h-4"/>} label="Admission Year" value={enquiry.admissionYear} />
          </div>

          {/* Stream & Percentage */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Academic Performance</h3>
            <InfoRow icon={<BookOpen className="w-4 h-4"/>} label="Stream" value={enquiry.stream} />
            <InfoRow icon={<TrendingUp className="w-4 h-4"/>} label="Percentage" value={`${enquiry.percentage}%`} />
            <InfoRow icon={<Calendar className="w-4 h-4"/>} label="Year of Passing" value={enquiry.yearOfPassing} />
            {enquiry.entranceExam && <InfoRow icon={<FileText className="w-4 h-4"/>} label="Entrance Exam" value={enquiry.entranceExam} />}
          </div>

          {/* Preferences */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Preferences</h3>
            <InfoRow icon={<GraduationCap className="w-4 h-4"/>} label="University Type" value={enquiry.universityType} />
            <InfoRow icon={<MapPin className="w-4 h-4"/>} label="Hostel Required" value={enquiry.hostelRequired} />
            <InfoRow icon={<Bell className="w-4 h-4"/>} label="Scholarship" value={enquiry.scholarshipRequired} />
            <InfoRow icon={<Clock className="w-4 h-4"/>} label="Urgency" value={enquiry.urgency} />
          </div>

          {/* Preferred States */}
          {enquiry.preferredStates && enquiry.preferredStates.length > 0 && (
            <div className="md:col-span-2">
              <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide mb-2">Preferred States</h3>
              <div className="flex flex-wrap gap-1.5">
                {enquiry.preferredStates.map(s => (
                  <span key={s} className="bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full">{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* Additional Info */}
          {enquiry.additionalInfo && (
            <div className="md:col-span-2">
              <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide mb-2">Additional Information</h3>
              <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">{enquiry.additionalInfo}</p>
            </div>
          )}

          {/* Admin controls */}
          <div className="md:col-span-2 border-t pt-5 space-y-4">
            <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Admin Actions</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value as EnquiryStatus)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500"
                >
                  {ENQUIRY_STATUSES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Follow-up Date</label>
                <input
                  type="date"
                  value={followUp}
                  onChange={e => setFollowUp(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Counsellor Notes</label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={3}
                placeholder="Add counselling notes about this lead..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 resize-none"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={onClose} className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                Close
              </button>
              <button
                onClick={save}
                className="px-5 py-2 text-sm bg-navy-800 text-white rounded-lg hover:bg-navy-900 transition flex items-center gap-2"
              >
                {saved ? <><CheckCircle className="w-4 h-4" /> Saved!</> : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Delete Confirm ─── */
const DeleteConfirm: React.FC<{ name: string; onConfirm: () => void; onCancel: () => void }> = ({ name, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Trash2 className="w-6 h-6 text-red-500" />
      </div>
      <h3 className="text-lg font-bold text-gray-800 text-center mb-1">Delete Enquiry?</h3>
      <p className="text-sm text-gray-500 text-center mb-5">
        This will permanently delete the enquiry from <strong>{name}</strong>. This action cannot be undone.
      </p>
      <div className="flex gap-3">
        <button onClick={onCancel} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition">
          Cancel
        </button>
        <button onClick={onConfirm} className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition">
          Delete
        </button>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════
   MAIN DASHBOARD
═══════════════════════════════════════ */
const AdminDashboard: React.FC = () => {
  const { enquiries, isLoggedIn, logout, updateEnquiry, deleteEnquiry } = useAdmin();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterCourse, setFilterCourse] = useState('All');
  const [filterYear, setFilterYear] = useState('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Enquiry | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'analytics'>('overview');
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const handleLogout = () => { logout(); navigate('/admin'); };

  /* ─── Filtered list ─── */
  const filtered = useMemo(() => {
    return enquiries.filter(e => {
      const q = search.toLowerCase();
      const matchSearch = !q
        || e.studentName.toLowerCase().includes(q)
        || e.mobile.includes(q)
        || e.email.toLowerCase().includes(q)
        || e.id.toLowerCase().includes(q);
      const matchStatus = filterStatus === 'All' || e.status === filterStatus;
      const matchCourse = filterCourse === 'All' || e.preferredCourse === filterCourse;
      const matchYear = filterYear === 'All' || e.admissionYear === filterYear;
      return matchSearch && matchStatus && matchCourse && matchYear;
    });
  }, [enquiries, search, filterStatus, filterCourse, filterYear]);

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  /* ─── Stats ─── */
  const stats = useMemo(() => ({
    total: enquiries.length,
    newLeads: enquiries.filter(e => e.status === 'New Lead').length,
    contacted: enquiries.filter(e => e.status === 'Contacted').length,
    confirmed: enquiries.filter(e => e.status === 'Admission Confirmed').length,
    thisMonth: enquiries.filter(e => {
      const d = new Date(e.submittedAt);
      const now = new Date();
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length,
  }), [enquiries]);

  /* ─── Chart data ─── */
  const courseData = useMemo(() => {
    const map: Record<string, number> = {};
    enquiries.forEach(e => { map[e.preferredCourse] = (map[e.preferredCourse] || 0) + 1; });
    return Object.entries(map)
      .map(([name, value]) => ({ name: name.length > 22 ? name.slice(0, 22) + '…' : name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 7);
  }, [enquiries]);

  const statusData = useMemo(() =>
    ENQUIRY_STATUSES
      .map(s => ({ name: s, value: enquiries.filter(e => e.status === s).length }))
      .filter(d => d.value > 0),
    [enquiries]
  );

  const monthlyData = useMemo(() => {
    const map: Record<string, number> = {};
    enquiries.forEach(e => {
      const d = new Date(e.submittedAt);
      const key = `${MONTH_NAMES[d.getMonth()]} '${String(d.getFullYear()).slice(2)}`;
      map[key] = (map[key] || 0) + 1;
    });
    return Object.entries(map).map(([name, count]) => ({ name, count })).slice(-6);
  }, [enquiries]);

  const budgetData = useMemo(() => {
    const map: Record<string, number> = {};
    enquiries.forEach(e => { map[e.budget] = (map[e.budget] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name: name.replace('₹', '').replace('per year', '').trim(), value }));
  }, [enquiries]);

  /* ─── Unique filter options ─── */
  const courses = useMemo(() => ['All', ...Array.from(new Set(enquiries.map(e => e.preferredCourse))).sort()], [enquiries]);
  const years = useMemo(() => ['All', ...Array.from(new Set(enquiries.map(e => e.admissionYear))).sort()], [enquiries]);

  /* ─── CSV export ─── */
  const exportCSV = () => {
    const headers = ['ID','Student Name','Parent Name','Mobile','Email','City','State','Course','Qualification','Budget','Admission Year','Urgency','Status','Follow-up Date','Notes','Submitted'];
    const rows = filtered.map(e => [
      e.id, e.studentName, e.parentName, e.mobile, e.email,
      e.city, e.state, e.preferredCourse, e.qualification,
      e.budget, e.admissionYear, e.urgency, e.status,
      e.followUpDate || '', (e.counsellorNotes || '').replace(/,/g, ';'), fmt(e.submittedAt)
    ].map(v => `"${v}"`).join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'kh-enquiries.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const confirmDelete = () => {
    if (deleteTarget) { deleteEnquiry(deleteTarget.id); setDeleteTarget(null); }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ── Top Bar ── */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gold-400 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-navy-900" />
          </div>
          <div>
            <span className="font-bold text-navy-900 text-sm">KH Educational Services</span>
            <span className="text-gray-400 text-xs ml-2 hidden sm:inline">Admin Dashboard</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Admin
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* ── Tabs ── */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-1">
          {(['overview', 'leads', 'analytics'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium capitalize border-b-2 transition ${
                activeTab === tab
                  ? 'border-navy-800 text-navy-800'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'overview' ? 'Overview' : tab === 'leads' ? `Leads (${enquiries.length})` : 'Analytics'}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto w-full">

        {/* ══ OVERVIEW ══ */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-xl font-bold text-gray-800">Dashboard Overview</h1>
              <p className="text-sm text-gray-500 mt-0.5">Summary of all student enquiries</p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { label: 'Total Enquiries', value: stats.total,     icon: <Users className="w-5 h-5"/>,        color: 'bg-blue-50 text-blue-600' },
                { label: 'New Leads',       value: stats.newLeads,  icon: <Bell className="w-5 h-5"/>,         color: 'bg-yellow-50 text-yellow-600' },
                { label: 'Contacted',       value: stats.contacted, icon: <Phone className="w-5 h-5"/>,        color: 'bg-indigo-50 text-indigo-600' },
                { label: 'Confirmed',       value: stats.confirmed, icon: <CheckCircle className="w-5 h-5"/>,  color: 'bg-green-50 text-green-600' },
                { label: 'This Month',      value: stats.thisMonth, icon: <TrendingUp className="w-5 h-5"/>,   color: 'bg-purple-50 text-purple-600' },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${s.color}`}>
                    {s.icon}
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{s.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-700 mb-4 text-sm">Monthly Enquiry Trend</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="count" name="Enquiries" stroke="#1e3a8a" strokeWidth={2.5} dot={{ fill: '#1e3a8a', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-700 mb-4 text-sm">Leads by Status</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={statusData} cx="50%" cy="50%" outerRadius={80} dataKey="value"
                      label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`} labelLine={false}>
                      {statusData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={(v, n) => [v, n]} />
                    <Legend iconSize={10} wrapperStyle={{ fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent leads */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b">
                <h3 className="font-semibold text-gray-700 text-sm">Recent Enquiries</h3>
                <button onClick={() => setActiveTab('leads')} className="text-xs text-navy-700 hover:underline">
                  View all →
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                    <tr>
                      <th className="px-5 py-3 text-left">Student</th>
                      <th className="px-5 py-3 text-left">Course</th>
                      <th className="px-5 py-3 text-left">Status</th>
                      <th className="px-5 py-3 text-left">Date</th>
                      <th className="px-5 py-3 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {enquiries.slice(0, 5).map(e => (
                      <tr key={e.id} className="hover:bg-gray-50 transition">
                        <td className="px-5 py-3">
                          <div className="font-medium text-gray-800">{e.studentName}</div>
                          <div className="text-xs text-gray-400">{e.mobile}</div>
                        </td>
                        <td className="px-5 py-3 text-gray-600 max-w-[160px] truncate text-xs">{e.preferredCourse}</td>
                        <td className="px-5 py-3"><StatusBadge status={e.status} /></td>
                        <td className="px-5 py-3 text-gray-500 text-xs">{fmt(e.submittedAt)}</td>
                        <td className="px-5 py-3">
                          <button onClick={() => setSelectedEnquiry(e)}
                            className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition" title="View details">
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ══ LEADS ══ */}
        {activeTab === 'leads' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold text-gray-800">All Enquiries</h1>
                <p className="text-sm text-gray-500">
                  {filtered.length !== enquiries.length
                    ? `${filtered.length} of ${enquiries.length} records`
                    : `${enquiries.length} total records`}
                </p>
              </div>
              <button
                onClick={exportCSV}
                className="inline-flex items-center gap-2 px-4 py-2 bg-navy-800 text-white text-sm rounded-lg hover:bg-navy-900 transition"
              >
                <Download className="w-4 h-4" /> Export CSV
              </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={e => { setSearch(e.target.value); setPage(1); }}
                    placeholder="Search name, phone, ID..."
                    className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-400"
                  />
                </div>

                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1); }}
                    className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-400 appearance-none">
                    <option value="All">All Statuses</option>
                    {ENQUIRY_STATUSES.map(s => <option key={s}>{s}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select value={filterCourse} onChange={e => { setFilterCourse(e.target.value); setPage(1); }}
                    className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-400 appearance-none">
                    {courses.map(c => <option key={c}>{c}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select value={filterYear} onChange={e => { setFilterYear(e.target.value); setPage(1); }}
                    className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-400 appearance-none">
                    {years.map(y => <option key={y}>{y}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {(filterStatus !== 'All' || filterCourse !== 'All' || filterYear !== 'All' || search) && (
                <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t items-center">
                  {search && <FilterChip label={`"${search}"`} onRemove={() => { setSearch(''); setPage(1); }} />}
                  {filterStatus !== 'All' && <FilterChip label={filterStatus} onRemove={() => { setFilterStatus('All'); setPage(1); }} />}
                  {filterCourse !== 'All' && <FilterChip label={filterCourse} onRemove={() => { setFilterCourse('All'); setPage(1); }} />}
                  {filterYear !== 'All' && <FilterChip label={filterYear} onRemove={() => { setFilterYear('All'); setPage(1); }} />}
                  <button
                    onClick={() => { setSearch(''); setFilterStatus('All'); setFilterCourse('All'); setFilterYear('All'); setPage(1); }}
                    className="text-xs text-red-500 hover:underline ml-1">Clear all
                  </button>
                </div>
              )}
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {paginated.length === 0 ? (
                <div className="text-center py-16">
                  <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">No enquiries found</p>
                  <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                        <tr>
                          <th className="px-5 py-3 text-left">Student</th>
                          <th className="px-5 py-3 text-left">Course Interest</th>
                          <th className="px-5 py-3 text-left">Budget</th>
                          <th className="px-5 py-3 text-left">Location</th>
                          <th className="px-5 py-3 text-left">Year</th>
                          <th className="px-5 py-3 text-left">Status</th>
                          <th className="px-5 py-3 text-left">Submitted</th>
                          <th className="px-5 py-3 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {paginated.map(e => (
                          <tr key={e.id} className="hover:bg-gray-50 transition">
                            <td className="px-5 py-3">
                              <div className="font-medium text-gray-800">{e.studentName}</div>
                              <div className="text-xs text-gray-400">{e.mobile}</div>
                              <div className="text-xs font-mono text-gray-300">{e.id}</div>
                            </td>
                            <td className="px-5 py-3 text-gray-600 text-xs max-w-[160px]">
                              <span className="block truncate">{e.preferredCourse}</span>
                              <span className="text-gray-400">{e.courseLevel}</span>
                            </td>
                            <td className="px-5 py-3 text-gray-600 text-xs">{e.budget}</td>
                            <td className="px-5 py-3 text-gray-600 text-xs">{e.city}, {e.state}</td>
                            <td className="px-5 py-3 text-gray-600 text-xs">{e.admissionYear}</td>
                            <td className="px-5 py-3"><StatusBadge status={e.status} /></td>
                            <td className="px-5 py-3 text-gray-400 text-xs whitespace-nowrap">{fmt(e.submittedAt)}</td>
                            <td className="px-5 py-3">
                              <div className="flex items-center gap-1">
                                <button onClick={() => setSelectedEnquiry(e)}
                                  className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition" title="View">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button onClick={() => setDeleteTarget(e)}
                                  className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg transition" title="Delete">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {totalPages > 1 && (
                    <div className="flex items-center justify-between px-5 py-3 border-t text-sm">
                      <span className="text-gray-500 text-xs">Page {page} of {totalPages}</span>
                      <div className="flex gap-1">
                        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                          className="px-3 py-1.5 border rounded-lg disabled:opacity-40 hover:bg-gray-50 transition text-xs">←</button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                          <button key={p} onClick={() => setPage(p)}
                            className={`px-3 py-1.5 border rounded-lg transition text-xs ${p === page ? 'bg-navy-800 text-white border-navy-800' : 'hover:bg-gray-50'}`}>
                            {p}
                          </button>
                        ))}
                        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
                          className="px-3 py-1.5 border rounded-lg disabled:opacity-40 hover:bg-gray-50 transition text-xs">→</button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* ══ ANALYTICS ══ */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-xl font-bold text-gray-800">Analytics</h1>
              <p className="text-sm text-gray-500">Charts and insights across all {enquiries.length} enquiries</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Courses */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-700 mb-4 text-sm">Top Courses of Interest</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={courseData} layout="vertical" margin={{ left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={140} />
                    <Tooltip />
                    <Bar dataKey="value" name="Enquiries" fill="#1e3a8a" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Budget */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-700 mb-4 text-sm">Budget Distribution</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={budgetData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 9 }} />
                    <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="value" name="Enquiries" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Status pie */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-700 mb-4 text-sm">Lead Status Breakdown</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie data={statusData} cx="50%" cy="50%" outerRadius={90} innerRadius={40} dataKey="value"
                      label={({ name, value }) => `${value}`}>
                      {statusData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                    <Legend iconSize={10} wrapperStyle={{ fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Monthly trend */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-700 mb-4 text-sm">Monthly Enquiry Trend</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="count" name="Enquiries" stroke="#1e3a8a" strokeWidth={2.5}
                      dot={{ fill: '#1e3a8a', r: 5 }} activeDot={{ r: 7 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Status summary cards */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-700 mb-4 text-sm">Status Summary</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {statusData.map((s, i) => (
                  <div key={s.name} className="text-center p-3 rounded-xl border"
                    style={{ borderColor: PIE_COLORS[i % PIE_COLORS.length] + '40', background: PIE_COLORS[i % PIE_COLORS.length] + '10' }}>
                    <p className="text-2xl font-bold" style={{ color: PIE_COLORS[i % PIE_COLORS.length] }}>{s.value}</p>
                    <p className="text-xs text-gray-600 mt-1 leading-tight">{s.name}</p>
                    <p className="text-xs text-gray-400">{((s.value / enquiries.length) * 100).toFixed(0)}%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      {selectedEnquiry && (
        <DetailModal
          enquiry={selectedEnquiry}
          onClose={() => setSelectedEnquiry(null)}
          onUpdate={(id, updates) => {
            updateEnquiry(id, updates);
            setSelectedEnquiry(prev => prev ? { ...prev, ...updates } : null);
          }}
        />
      )}
      {deleteTarget && (
        <DeleteConfirm
          name={deleteTarget.studentName}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
