import React, { useState } from 'react';
import { useHSE } from '../../../context/HSEContext';
import { FolderLock, Search, Filter, Plus, Download, FileText, Eye, CheckCircle2, Clock, Upload } from 'lucide-react';
import { Badge } from '../../common/Badge';
import { Modal } from '../../common/Modal';
import { ControlledDocument } from '../../../types';

export const DocumentControlModule: React.FC = () => {
  const { documents, addDocument, currentUser, addToast } = useHSE();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedDoc, setSelectedDoc] = useState<ControlledDocument | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Upload Modal State
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [docNumber, setDocNumber] = useState(`DOC-HSE-${Date.now().toString().slice(-4)}`);
  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState<any>('Procedures');
  const [docVersion, setDocVersion] = useState('1.0');

  const filtered = documents.filter((doc) => {
    if (categoryFilter !== 'All' && doc.category !== categoryFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        doc.documentNumber.toLowerCase().includes(q) ||
        doc.title.toLowerCase().includes(q) ||
        doc.owner.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim()) return;

    addDocument({
      id: `DOC-${Date.now()}`,
      documentNumber: docNumber,
      title: docTitle,
      category: docCategory,
      version: docVersion,
      owner: currentUser.name,
      approvalStatus: 'Approved',
      effectiveDate: new Date().toISOString().substring(0, 10),
      reviewDate: '2027-11-01',
      fileFormat: 'PDF',
      fileSizeKb: 850,
    });

    setIsUploadOpen(false);
    setDocTitle('');
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-150 text-xs">
      {/* Header */}
      <div className="bg-white p-4 rounded-xl border border-[#E3EAE6] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#172B25]">Document Control & Quality Management</h2>
            <Badge variant="closed" size="sm">{documents.length} controlled records</Badge>
          </div>
          <p className="text-xs text-[#65756D] mt-0.5">
            ISO 45001 & 14001 document governance, versioning, review intervals and digital safety repository
          </p>
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="px-3.5 py-1.5 bg-[#087F5B] hover:bg-[#073B2F] text-white font-bold rounded-lg flex items-center gap-1.5 shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Controlled Document</span>
        </button>
      </div>

      {/* Filter Row */}
      <div className="bg-white p-3 rounded-xl border border-[#E3EAE6] shadow-sm grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search document #, title or owner..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#F4F7F5] border border-[#E3EAE6] rounded-lg outline-none"
          />
        </div>

        <div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 bg-[#F4F7F5] border border-[#E3EAE6] rounded-lg outline-none"
          >
            <option value="All">All Document Categories</option>
            <option value="HSE policies">HSE policies</option>
            <option value="Procedures">Procedures</option>
            <option value="Risk assessments">Risk assessments</option>
            <option value="Method statements">Method statements</option>
            <option value="Emergency plans">Emergency plans</option>
            <option value="Inspection checklists">Inspection checklists</option>
            <option value="Legal documents">Legal documents</option>
            <option value="Environmental records">Environmental records</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#E3EAE6] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F4F7F5] text-[#65756D] border-b border-[#E3EAE6]">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Document #</th>
                <th className="py-2.5 px-3 font-semibold">Title</th>
                <th className="py-2.5 px-3 font-semibold">Category</th>
                <th className="py-2.5 px-3 font-semibold">Version</th>
                <th className="py-2.5 px-3 font-semibold">Owner</th>
                <th className="py-2.5 px-3 font-semibold">Effective</th>
                <th className="py-2.5 px-3 font-semibold">Next Review</th>
                <th className="py-2.5 px-3 font-semibold">Status</th>
                <th className="py-2.5 px-3 font-semibold text-center">Preview</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3EAE6]">
              {filtered.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50/80">
                  <td className="py-3 px-3 font-mono font-bold text-[#073B2F] whitespace-nowrap">{doc.documentNumber}</td>
                  <td className="py-3 px-3 max-w-sm font-bold text-gray-900">{doc.title}</td>
                  <td className="py-3 px-3 whitespace-nowrap text-gray-700">{doc.category}</td>
                  <td className="py-3 px-3 whitespace-nowrap font-mono text-gray-600">v{doc.version}</td>
                  <td className="py-3 px-3 whitespace-nowrap text-gray-700">{doc.owner}</td>
                  <td className="py-3 px-3 whitespace-nowrap text-gray-600">{doc.effectiveDate}</td>
                  <td className="py-3 px-3 whitespace-nowrap text-gray-600">{doc.reviewDate}</td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <Badge variant={doc.approvalStatus === 'Approved' ? 'closed' : 'underReview'} size="sm">
                      {doc.approvalStatus}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <button
                      onClick={() => {
                        setSelectedDoc(doc);
                        setIsPreviewOpen(true);
                      }}
                      className="px-2.5 py-1 bg-gray-100 hover:bg-[#073B2F] hover:text-white text-gray-700 font-semibold rounded text-[11px] transition-colors"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preview Modal */}
      {isPreviewOpen && selectedDoc && (
        <Modal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          title={`Controlled Document: ${selectedDoc.documentNumber}`}
          subtitle={`${selectedDoc.title} (v${selectedDoc.version})`}
          maxWidth="2xl"
        >
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
              <div>
                <span className="text-[10px] text-gray-500 block">Category: {selectedDoc.category}</span>
                <span className="font-bold text-gray-900 text-sm">{selectedDoc.title}</span>
              </div>
              <Badge variant="closed">{selectedDoc.approvalStatus}</Badge>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-xl text-center space-y-2">
              <FileText className="w-12 h-12 text-[#087F5B] mx-auto" />
              <h4 className="font-bold text-sm text-gray-900">{selectedDoc.documentNumber}.pdf</h4>
              <p className="text-[11px] text-gray-500">
                Size: {selectedDoc.fileSizeKb} KB • Authorized Owner: {selectedDoc.owner}
              </p>
              <p className="text-[10px] text-gray-400">
                Document metadata persisted in browser demonstration store.
              </p>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-200 text-gray-500 text-[11px]">
              <span>Next Annual Review: <strong>{selectedDoc.reviewDate}</strong></span>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Upload Modal */}
      {isUploadOpen && (
        <Modal
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
          title="Upload Controlled Document"
          subtitle="Register controlled policy, SOP, risk assessment or permit template"
          maxWidth="2xl"
        >
          <form onSubmit={handleUploadSubmit} className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Document Number *</label>
                <input
                  type="text"
                  required
                  value={docNumber}
                  onChange={(e) => setDocNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Version</label>
                <input
                  type="text"
                  value={docVersion}
                  onChange={(e) => setDocVersion(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">Document Title *</label>
              <input
                type="text"
                required
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                placeholder="e.g. Scaffolding Safe Erection & Green-Tagging Procedure"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">Category</label>
              <select
                value={docCategory}
                onChange={(e) => setDocCategory(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg outline-none"
              >
                <option value="HSE policies">HSE policies</option>
                <option value="Procedures">Procedures</option>
                <option value="Risk assessments">Risk assessments</option>
                <option value="Method statements">Method statements</option>
                <option value="Emergency plans">Emergency plans</option>
                <option value="Inspection checklists">Inspection checklists</option>
                <option value="Legal documents">Legal documents</option>
              </select>
            </div>

            <div className="p-4 border-2 border-dashed border-gray-300 rounded-xl text-center space-y-1 bg-gray-50">
              <Upload className="w-6 h-6 text-gray-400 mx-auto" />
              <span className="font-bold text-gray-700 block">Select File to Register</span>
              <span className="text-[10px] text-gray-500">PDF, DOCX, XLSX up to 25MB</span>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsUploadOpen(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#087F5B] hover:bg-[#073B2F] text-white rounded-lg font-bold shadow"
              >
                Save & Register Document
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
