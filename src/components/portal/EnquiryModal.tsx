import React, { useState } from 'react';
import { useHSE } from '../../context/HSEContext';
import {
  X,
  Send,
  CheckCircle2,
  Shield,
  Building2,
  Mail,
  Phone,
  User,
  FileText,
  Calendar,
  Sparkles,
} from 'lucide-react';

export const EnquiryModal: React.FC = () => {
  const { isEnquiryModalOpen, setIsEnquiryModalOpen, addToast } = useHSE();

  const [formData, setFormData] = useState({
    fullName: '',
    jobTitle: '',
    organisationName: '',
    email: '',
    phone: '',
    projectScope: 'Civil Infrastructure & Construction',
    serviceInterest: 'Complete HSE Digital Platform & Qatar Regulatory Advisory',
    workforceSize: '500 - 2,500 workers',
    preferredDate: '',
    requirements: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isEnquiryModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    addToast('success', 'Enquiry Submitted Successfully', 'Our Qatar HSE Advisory team will contact you within 24 business hours.');
    setTimeout(() => {
      setIsSubmitted(false);
      setIsEnquiryModalOpen(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-2xl w-full overflow-hidden text-gray-800 animate-in zoom-in-95">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#073B2F] via-[#087F5B] to-[#073B2F] p-6 text-white relative">
          <button
            onClick={() => setIsEnquiryModalOpen(false)}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-[11px] font-semibold text-[#DDF5EA] tracking-wider uppercase font-mono">
              Enterprise Consultation & Demonstration
            </span>
          </div>
          <h2 className="text-xl font-bold flex items-center gap-2.5">
            <Shield className="w-6 h-6 text-[#20A887]" />
            <span>Enquire About QHSE Services & Platform</span>
          </h2>
          <p className="text-xs text-[#DDF5EA]/90 mt-1 max-w-lg">
            Request an in-depth HSE advisory consultation, schedule a Qatar statutory compliance audit, or arrange a private dual-workspace platform demonstration.
          </p>
        </div>

        {/* Content */}
        {isSubmitted ? (
          <div className="p-10 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#087F5B] flex items-center justify-center mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Enquiry Received</h3>
            <p className="text-sm text-gray-600 mt-2 max-w-md">
              Thank you, <span className="font-semibold text-gray-900">{formData.fullName || 'Safety Leader'}</span>. Your request regarding <span className="font-semibold text-[#087F5B]">{formData.serviceInterest}</span> has been logged into our local demonstration registry.
            </p>
            <div className="mt-4 px-4 py-2 bg-[#F4F7F5] rounded-lg border border-[#E3EAE6] text-xs text-gray-500 font-mono">
              Reference: ENQ-{new Date().getFullYear()}-{Math.floor(1000 + Math.random() * 9000)} • Qatar Enterprise Portal
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[78vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq Al-Kuwari"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#087F5B] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Job Title / Designation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. HSE Director / Project Manager"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#087F5B] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Organisation / Company Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Qatar Infrastructure Contractors"
                    value={formData.organisationName}
                    onChange={(e) => setFormData({ ...formData, organisationName: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#087F5B] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Corporate Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="name@company.com.qa"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#087F5B] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Contact Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    placeholder="+974 4400 1234"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#087F5B] focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Workforce Scale
                </label>
                <select
                  value={formData.workforceSize}
                  onChange={(e) => setFormData({ ...formData, workforceSize: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#087F5B] focus:border-transparent outline-none bg-white"
                >
                  <option value="100 - 500 workers">100 - 500 workers</option>
                  <option value="500 - 2,500 workers">500 - 2,500 workers</option>
                  <option value="2,500 - 10,000 workers">2,500 - 10,000 workers</option>
                  <option value="10,000+ enterprise workforce">10,000+ enterprise workforce</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Primary Service Area of Interest <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.serviceInterest}
                onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#087F5B] focus:border-transparent outline-none bg-white"
              >
                <option value="Complete HSE Digital Platform & Qatar Regulatory Advisory">
                  Complete HSE Digital Platform & Qatar Regulatory Advisory
                </option>
                <option value="Qatar Statutory Legal Register & Al Meezan Compliance Audit">
                  Qatar Statutory Legal Register & Al Meezan Compliance Audit
                </option>
                <option value="Mobile Workforce Safety & Stop Work Authority Rollout">
                  Mobile Workforce Safety & Stop Work Authority Rollout
                </option>
                <option value="Ministerial Decision 17/2021 Heat Stress Management System">
                  Ministerial Decision 17/2021 Heat Stress Management System
                </option>
                <option value="AI Safety Copilot, Computer Vision & Predictive Analytics">
                  AI Safety Copilot, Computer Vision & Predictive Analytics
                </option>
                <option value="Environmental Impact (Law 30/2002) & Carbon / Waste Governance">
                  Environmental Impact (Law 30/2002) & Carbon / Waste Governance
                </option>
                <option value="Permit to Work (PTW) & High-Risk Activity Governance">
                  Permit to Work (PTW) & High-Risk Activity Governance
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Specific Project Requirements / Operational Goals
              </label>
              <textarea
                rows={3}
                placeholder="Describe your current site safety objectives, Qatar regulatory deadlines, or platform customization needs..."
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#087F5B] focus:border-transparent outline-none resize-none"
              ></textarea>
            </div>

            <div className="p-3 bg-[#F4F7F5] rounded-xl border border-[#E3EAE6] flex items-start gap-2.5 text-xs text-gray-600">
              <Sparkles className="w-4 h-4 text-[#087F5B] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800">Compliant with Qatar Statutory Standards</p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Adheres to Qatar Labour Law No. 14/2004, Heat Stress MD 17/2021, Law 30/2002 on Environmental Protection, and Qatar Civil Defence safety regulations.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsEnquiryModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#087F5B] hover:bg-[#073B2F] text-white rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Enterprise Enquiry</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};