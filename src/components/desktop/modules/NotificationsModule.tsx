import React, { useState } from 'react';
import { useHSE } from '../../../context/HSEContext';
import { Bell, Search, Filter, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import { Badge } from '../../common/Badge';

export const NotificationsModule: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead, setActiveDesktopModule, setSelectedRecordRef } = useHSE();

  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [unreadOnly, setUnreadOnly] = useState(false);

  const filtered = notifications.filter((n) => {
    if (priorityFilter !== 'All' && n.priority !== priorityFilter) return false;
    if (unreadOnly && n.read) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return n.title.toLowerCase().includes(q) || n.message.toLowerCase().includes(q);
    }
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-4 animate-in fade-in duration-150 text-xs">
      {/* Header */}
      <div className="bg-white p-4 rounded-xl border border-[#E3EAE6] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#172B25]">Notifications & Alert Centre</h2>
            <Badge variant="high" size="sm">{unreadCount} unread alerts</Badge>
          </div>
          <p className="text-xs text-[#65756D] mt-0.5">
            Automated alerts for hazard submissions, CAPA assignments, WBGT heat stress thresholds, and audit events
          </p>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className="px-3.5 py-1.5 bg-[#087F5B] hover:bg-[#073B2F] text-white font-bold rounded-lg shadow transition-colors"
        >
          Mark All As Read
        </button>
      </div>

      {/* Filter Row */}
      <div className="bg-white p-3 rounded-xl border border-[#E3EAE6] shadow-sm grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search notification messages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#F4F7F5] border border-[#E3EAE6] rounded-lg outline-none"
          />
        </div>

        <div>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="w-full px-3 py-2 bg-[#F4F7F5] border border-[#E3EAE6] rounded-lg outline-none"
          >
            <option value="All">All Priorities</option>
            <option value="Critical">Critical Alerts</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low / Info</option>
          </select>
        </div>

        <div className="flex items-center gap-2 px-2">
          <input
            type="checkbox"
            id="unreadOnly"
            checked={unreadOnly}
            onChange={(e) => setUnreadOnly(e.target.checked)}
            className="w-4 h-4 rounded text-[#087F5B]"
          />
          <label htmlFor="unreadOnly" className="text-gray-700 font-semibold cursor-pointer">
            Show unread notifications only
          </label>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-xl border border-[#E3EAE6] shadow-sm divide-y divide-gray-100 overflow-hidden">
        {filtered.map((n) => (
          <div
            key={n.id}
            onClick={() => {
              markNotificationRead(n.id);
              if (n.linkModule) {
                setActiveDesktopModule(n.linkModule as any);
                if (n.linkRef) setSelectedRecordRef(n.linkRef);
              }
            }}
            className={`p-3.5 text-left hover:bg-gray-50/80 cursor-pointer transition-colors flex items-start justify-between gap-4 ${
              !n.read ? 'bg-emerald-50/40' : ''
            }`}
          >
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900 text-sm">{n.title}</span>
                <Badge variant={n.priority === 'High' ? 'high' : n.priority === 'Critical' ? 'critical' : 'neutral'} size="sm">
                  {n.category}
                </Badge>
                {!n.read && (
                  <span className="w-2 h-2 rounded-full bg-[#087F5B]"></span>
                )}
              </div>
              <p className="text-gray-700 text-xs leading-relaxed">{n.message}</p>
              <div className="flex items-center gap-3 text-[10px] text-gray-400 pt-1">
                <span>Timestamp: {n.timestamp}</span>
                {n.linkRef && (
                  <span className="text-[#087F5B] font-semibold flex items-center gap-0.5">
                    Navigate to {n.linkRef} <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                markNotificationRead(n.id);
              }}
              className="text-[10px] text-gray-400 hover:text-gray-700 px-2 py-1 rounded border border-gray-200"
            >
              {n.read ? 'Read' : 'Mark Read'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
