import React, { useState } from 'react';
import { CelebrationEvent, InvitationDraft } from '../../types/event';
import { useEvents } from '../../context/EventContext';
import { 
  Mail, 
  Share2, 
  Copy, 
  Check, 
  Sparkles, 
  Send, 
  Plus, 
  Trash2, 
  Edit2, 
  MessageSquare, 
  PartyPopper, 
  Mic, 
  Heart,
  X
} from 'lucide-react';

interface InvitationsTabProps {
  event: CelebrationEvent;
}

export const InvitationsTab: React.FC<InvitationsTabProps> = ({ event }) => {
  const { addInvitation, updateInvitation, deleteInvitation } = useEvents();

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingInvite, setEditingInvite] = useState<InvitationDraft | null>(null);

  // Custom Generator Form
  const [inviteFormat, setInviteFormat] = useState('WhatsApp Broadcast');
  const [inviteTone, setInviteTone] = useState('Warm & Celebratory');
  const [hostNames, setHostNames] = useState('');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleWhatsAppShare = (content: string, draftId: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(draftId);
    setTimeout(() => setCopiedId(null), 2500);

    const encoded = encodeURIComponent(content);
    try {
      window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank', 'noopener,noreferrer');
    } catch {
      // In strict sandboxed iframes where window.open is blocked, content is already copied
    }
  };

  const handleGenerateCustomInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const res = await fetch('/api/plan/custom-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event,
          inviteType: inviteFormat,
          tone: inviteTone,
          specificNames: hostNames.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (data.content) {
        addInvitation(event.id, {
          style: inviteFormat,
          title: data.title || `${inviteFormat} Draft`,
          content: data.content,
          suggestedHashtags: data.hashtags || [],
        });
      }
    } catch (err) {
      console.error('Failed to generate invite:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInvite) return;
    updateInvitation(event.id, editingInvite);
    setEditingInvite(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner & Generator Form */}
      <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-rose-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-3 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" /> GenAI Copywriter
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            Personalized Invitations & Speeches
          </h2>
          <p className="text-amber-100 text-xs sm:text-sm mt-1 leading-relaxed">
            Generate culturally nuanced invitation cards, WhatsApp announcements, family toasts, and RSVP wording tailored to your event aesthetic.
          </p>
        </div>

        {/* Quick Generator Controls */}
        <form onSubmit={handleGenerateCustomInvite} className="mt-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/20 grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
          <div>
            <label className="block text-[11px] font-bold text-amber-100 uppercase tracking-wider mb-1">
              Select Format
            </label>
            <select
              value={inviteFormat}
              onChange={(e) => setInviteFormat(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white text-slate-800 text-xs font-semibold focus:outline-none"
            >
              <option value="WhatsApp Broadcast">WhatsApp Broadcast</option>
              <option value="Formal Printed Invitation">Formal Printed Invitation</option>
              <option value="Playful & Quirky Digital Card">Playful & Quirky Digital Card</option>
              <option value="Event Day Toast / Speech">Host Speech / Toast</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-amber-100 uppercase tracking-wider mb-1">
              Tone & Vibe
            </label>
            <select
              value={inviteTone}
              onChange={(e) => setInviteTone(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white text-slate-800 text-xs font-semibold focus:outline-none"
            >
              <option value="Warm & Celebratory">Warm & Celebratory</option>
              <option value="Royal & Traditional (Shree Ganeshay Namah)">Royal & Traditional</option>
              <option value="Fun, Humorous & Breezy">Fun & Humorous</option>
              <option value="Poetic & Emotional">Poetic & Emotional</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-amber-100 uppercase tracking-wider mb-1">
              Host / Family Names
            </label>
            <input
              type="text"
              value={hostNames}
              onChange={(e) => setHostNames(e.target.value)}
              placeholder="e.g. Sharma Family, Rohan's Crew"
              className="w-full px-3 py-2 rounded-xl bg-white text-slate-800 text-xs focus:outline-none"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Generate New Draft</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Generated Invitation Drafts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(!event.invitations || event.invitations.length === 0) ? (
          <div className="col-span-full bg-white rounded-3xl p-10 text-center border border-slate-200 text-slate-400 text-xs">
            No invitation drafts yet. Click "Generate New Draft" above!
          </div>
        ) : (
          (event.invitations || []).map((draft) => {
            const isCopied = copiedId === draft.id;

            return (
              <div
                key={draft.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:border-amber-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                      {draft.style}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setEditingInvite(draft)}
                        className="p-1 rounded-md text-slate-400 hover:text-slate-700 transition-colors"
                        title="Edit text"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteInvitation(event.id, draft.id)}
                        className="p-1 rounded-md text-slate-400 hover:text-rose-600 transition-colors"
                        title="Delete draft"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-3 font-display">
                    {draft.title}
                  </h3>

                  {/* Card Content Display */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 font-sans text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
                    {draft.content}
                  </div>

                  {draft.suggestedHashtags && draft.suggestedHashtags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {draft.suggestedHashtags.map((tag, idx) => (
                        <span key={idx} className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Action Buttons */}
                <div className="flex items-center justify-between gap-3 mt-5 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => handleWhatsAppShare(draft.content, draft.id)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Send via WhatsApp</span>
                  </button>

                  <button
                    onClick={() => handleCopy(draft.content, draft.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isCopied
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Text</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* Edit Invitation Modal */}
      {editingInvite && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 max-w-lg w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-bold text-slate-900 font-display">
                Edit Invitation Content
              </h4>
              <button 
                onClick={() => setEditingInvite(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Draft Title
                </label>
                <input
                  type="text"
                  required
                  value={editingInvite.title}
                  onChange={(e) => setEditingInvite({ ...editingInvite, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Content / Message Text
                </label>
                <textarea
                  rows={8}
                  required
                  value={editingInvite.content}
                  onChange={(e) => setEditingInvite({ ...editingInvite, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 leading-relaxed font-sans"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingInvite(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-xs cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
