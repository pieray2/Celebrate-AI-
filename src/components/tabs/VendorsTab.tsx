import React, { useState } from 'react';
import { CelebrationEvent, VendorItem, VendorStatus } from '../../types/event';
import { formatINR } from '../../utils/formatters';
import { useEvents } from '../../context/EventContext';
import { 
  Building2, 
  Utensils, 
  Camera, 
  Music, 
  Sparkles, 
  Plus, 
  Trash2, 
  Edit2, 
  Phone, 
  HelpCircle, 
  CheckCircle, 
  Info, 
  X,
  Search,
  Filter
} from 'lucide-react';

interface VendorsTabProps {
  event: CelebrationEvent;
}

const VENDOR_STATUSES: { status: VendorStatus; label: string; badge: string }[] = [
  { status: 'Researching', label: 'Researching', badge: 'bg-slate-100 text-slate-700 border-slate-200' },
  { status: 'Contacted', label: 'Contacted', badge: 'bg-blue-50 text-blue-700 border-blue-200' },
  { status: 'Shortlisted', label: 'Shortlisted', badge: 'bg-amber-50 text-amber-700 border-amber-200' },
  { status: 'Booked', label: 'Booked ✓', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 font-bold' },
  { status: 'Declined', label: 'Declined', badge: 'bg-rose-50 text-rose-700 border-rose-200' },
];

export const VendorsTab: React.FC<VendorsTabProps> = ({ event }) => {
  const { updateVendor, addVendor, deleteVendor } = useEvents();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<VendorItem | null>(null);

  // New Vendor Form
  const [newCategory, setNewCategory] = useState('Venue');
  const [newRole, setNewRole] = useState('');
  const [newName, setNewName] = useState('');
  const [newContact, setNewContact] = useState('');
  const [newPrice, setNewPrice] = useState<number>(50000);
  const [newStatus, setNewStatus] = useState<VendorStatus>('Researching');
  const [newQuestionStr, setNewQuestionStr] = useState('');
  const [newNotes, setNewNotes] = useState('');

  // Categories present in the checklist
  const categories = Array.from(new Set(event.vendorChecklist.map((v) => v.category)));

  // Filter vendors
  const filteredVendors = event.vendorChecklist.filter((v) => {
    if (selectedCategory !== 'All' && v.category !== selectedCategory) return false;
    if (selectedStatus !== 'All' && v.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchRole = v.vendorRole.toLowerCase().includes(q);
      const matchName = v.name?.toLowerCase().includes(q);
      const matchNotes = v.notes?.toLowerCase().includes(q);
      if (!matchRole && !matchName && !matchNotes) return false;
    }
    return true;
  });

  const bookedCount = event.vendorChecklist.filter((v) => v.status === 'Booked').length;

  const handleCreateVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRole.trim()) return;

    const questions = newQuestionStr
      .split('\n')
      .map((q) => q.trim())
      .filter(Boolean);

    addVendor(event.id, {
      category: newCategory,
      vendorRole: newRole.trim(),
      name: newName.trim() || undefined,
      contact: newContact.trim() || undefined,
      estimatedPrice: Number(newPrice) || 0,
      status: newStatus,
      questionsToAsk: questions.length > 0 ? questions : ['Confirm delivery timing', 'Check cancellation terms'],
      notes: newNotes.trim(),
      isAIEstimate: false,
    });

    setNewRole('');
    setNewName('');
    setNewContact('');
    setNewQuestionStr('');
    setNewNotes('');
    setIsAddModalOpen(false);
  };

  const handleUpdateVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVendor) return;

    updateVendor(event.id, editingVendor);
    setEditingVendor(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Notice & Disclaimer */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 leading-relaxed">
          <span className="font-bold">Vendor Vetting Guide: </span>
          CelebrateAI generates structured vendor evaluation checklists with smart price benchmarks in Indian Rupees (₹) and key vetting questions. No real booking is confirmed until you execute an agreement directly with the vendor.
        </div>
      </div>

      {/* Metrics & Add button */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold font-display text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-600" />
            Vendor Evaluation & Booking Checklist
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {bookedCount} of {event.vendorChecklist.length} vendors finalized • Track estimates, questions & contact info
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Vendor</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-3 sm:px-5 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search vendor roles, names or notes..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 bg-white"
          >
            <option value="All">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 bg-white"
          >
            <option value="All">All Statuses</option>
            {VENDOR_STATUSES.map((s) => (
              <option key={s.status} value={s.status}>{s.label}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Vendor Cards Grid */}
      {filteredVendors.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 text-slate-400 text-xs">
          No vendors found matching criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredVendors.map((vendor) => {
            const statusConfig = VENDOR_STATUSES.find((s) => s.status === vendor.status) || VENDOR_STATUSES[0];

            return (
              <div 
                key={vendor.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-amber-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  
                  {/* Top Bar: Category & Status */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {vendor.category}
                    </span>

                    {/* Quick status dropdown */}
                    <select
                      value={vendor.status}
                      onChange={(e) => updateVendor(event.id, { ...vendor, status: e.target.value as VendorStatus })}
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border cursor-pointer focus:outline-none ${statusConfig.badge}`}
                    >
                      {VENDOR_STATUSES.map((s) => (
                        <option key={s.status} value={s.status}>{s.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Vendor Role & Name */}
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {vendor.vendorRole}
                  </h3>
                  
                  {vendor.name && (
                    <p className="text-xs font-semibold text-amber-700 mt-0.5">
                      {vendor.name}
                    </p>
                  )}

                  {/* Price & Contact */}
                  <div className="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Est. Budget</span>
                      <span className="font-bold text-slate-900 text-sm">{formatINR(vendor.estimatedPrice)}</span>
                      {vendor.isAIEstimate && (
                        <span className="text-[9px] text-amber-700 bg-amber-50 px-1 rounded ml-1 font-semibold">AI Estimate</span>
                      )}
                    </div>

                    {vendor.contact && (
                      <div className="ml-auto">
                        <span className="text-[10px] text-slate-400 block font-medium">Contact</span>
                        <a 
                          href={`tel:${vendor.contact.replace(/\s+/g, '')}`} 
                          className="font-medium text-slate-700 hover:text-amber-600 flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3 text-slate-400" />
                          <span>{vendor.contact}</span>
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Vetting Questions */}
                  {vendor.questionsToAsk && vendor.questionsToAsk.length > 0 && (
                    <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
                        <HelpCircle className="w-3 h-3 text-amber-600" /> Questions to Ask Vendor:
                      </p>
                      <ul className="space-y-1">
                        {vendor.questionsToAsk.map((q, idx) => (
                          <li key={idx} className="text-xs text-slate-700 flex items-start gap-1.5">
                            <span className="text-amber-500 font-bold">•</span>
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {vendor.notes && (
                    <p className="text-xs text-slate-500 italic mt-3 bg-amber-50/40 p-2 rounded-xl border border-amber-100/50">
                      "{vendor.notes}"
                    </p>
                  )}

                </div>

                {/* Footer Controls */}
                <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setEditingVendor(vendor)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer text-xs flex items-center gap-1"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => deleteVendor(event.id, vendor.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-xs flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Add Vendor Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-bold text-slate-900 font-display">
                Add Vendor to Checklist
              </h4>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateVendor} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Vendor Role / Service
                </label>
                <input
                  type="text"
                  required
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  placeholder="e.g. Master Mehendi Artist, Drone Cinematographer"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    required
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="e.g. Catering, Decor"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Booking Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as VendorStatus)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 bg-white"
                  >
                    {VENDOR_STATUSES.map((s) => (
                      <option key={s.status} value={s.status}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Vendor / Agency Name
                  </label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Dream Decor Studio"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone / Contact Info
                  </label>
                  <input
                    type="text"
                    value={newContact}
                    onChange={(e) => setNewContact(e.target.value)}
                    placeholder="+91 98..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Estimated Price (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Vetting Questions (One per line)
                </label>
                <textarea
                  rows={2}
                  value={newQuestionStr}
                  onChange={(e) => setNewQuestionStr(e.target.value)}
                  placeholder="e.g. Are fuel costs included?&#10;What is the sound cutoff time?"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Notes
                </label>
                <input
                  type="text"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g. Recommended by family friend"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-xs cursor-pointer"
                >
                  Save Vendor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Vendor Modal */}
      {editingVendor && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-bold text-slate-900 font-display">
                Edit Vendor Information
              </h4>
              <button 
                onClick={() => setEditingVendor(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateVendor} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Vendor Role
                </label>
                <input
                  type="text"
                  required
                  value={editingVendor.vendorRole}
                  onChange={(e) => setEditingVendor({ ...editingVendor, vendorRole: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Booking Status
                  </label>
                  <select
                    value={editingVendor.status}
                    onChange={(e) => setEditingVendor({ ...editingVendor, status: e.target.value as VendorStatus })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 bg-white"
                  >
                    {VENDOR_STATUSES.map((s) => (
                      <option key={s.status} value={s.status}>{s.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Estimated Price (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={editingVendor.estimatedPrice}
                    onChange={(e) => setEditingVendor({ ...editingVendor, estimatedPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Vendor / Firm Name
                  </label>
                  <input
                    type="text"
                    value={editingVendor.name || ''}
                    onChange={(e) => setEditingVendor({ ...editingVendor, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    value={editingVendor.contact || ''}
                    onChange={(e) => setEditingVendor({ ...editingVendor, contact: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Notes
                </label>
                <textarea
                  rows={2}
                  value={editingVendor.notes || ''}
                  onChange={(e) => setEditingVendor({ ...editingVendor, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingVendor(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-xs cursor-pointer"
                >
                  Update Vendor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
