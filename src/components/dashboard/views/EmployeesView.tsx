import React, { useState } from 'react';
import { UserCheck, PlusCircle, Shield, Check, X } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Employee } from '../../../types';

export const EmployeesView: React.FC = () => {
  const { employees, addEmployee, toggleEmployeePermission, currentBusiness } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [empName, setEmpName] = useState('');
  const [empPhone, setEmpPhone] = useState('');
  const [empEmail, setEmpEmail] = useState('');
  const [empRole, setEmpRole] = useState<'Manager' | 'Cashier' | 'Sales Staff' | 'Accountant'>('Cashier');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!empName) return;

    addEmployee({
      name: empName,
      phone: empPhone || '0300-0000000',
      email: empEmail || `${empName.toLowerCase().replace(/\s+/g, '')}@almadina.pk`,
      role: empRole,
      active: true,
      permissions: {
        sales: empRole === 'Cashier' || empRole === 'Sales Staff' || empRole === 'Manager',
        customers: true,
        inventory: empRole === 'Manager' || empRole === 'Accountant',
        expenses: empRole === 'Manager' || empRole === 'Accountant',
        reports: empRole === 'Manager' || empRole === 'Accountant',
        payments: empRole === 'Manager' || empRole === 'Cashier',
        settings: false,
      },
    });

    setShowAddModal(false);
    setEmpName('');
    setEmpPhone('');
    setEmpEmail('');
  };

  const permissionKeys: (keyof Employee['permissions'])[] = [
    'sales',
    'customers',
    'inventory',
    'expenses',
    'reports',
    'payments',
    'settings',
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0B1F33]">Team & Role Permissions</h2>
          <p className="text-xs text-slate-500">
            Control employee access for cashiers, accountants, and sales staff across {currentBusiness.name}.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Add Staff Member</span>
        </button>
      </div>

      {/* Staff Grid with Granular Permission Toggles */}
      <div className="space-y-4">
        {employees.map((emp) => (
          <div
            key={emp.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-slate-300 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center font-bold">
                  {emp.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">{emp.name}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-[#0F766E] border border-emerald-200">
                      {emp.role}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono-numbers">{emp.email} · {emp.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md font-semibold">
                  Active Access
                </span>
              </div>
            </div>

            {/* Granular Permission Toggles */}
            <div className="pt-4">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                Configured System Permissions (Click to Toggle):
              </span>
              <div className="flex flex-wrap gap-2">
                {permissionKeys.map((key) => {
                  const isGranted = emp.permissions[key];
                  return (
                    <button
                      key={key}
                      onClick={() => toggleEmployeePermission(emp.id, key)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isGranted
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                          : 'bg-slate-100 text-slate-400 border border-slate-200 hover:bg-slate-200/60'
                      }`}
                    >
                      {isGranted ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-slate-400" />
                      )}
                      <span className="capitalize">{key}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Staff Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-[#0B1F33] mb-1">Add Team Member</h3>
            <p className="text-xs text-slate-500 mb-4">Grant role-based access to your store.</p>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={empName}
                  onChange={(e) => setEmpName(e.target.value)}
                  placeholder="e.g. Asim Raza"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={empPhone}
                    onChange={(e) => setEmpPhone(e.target.value)}
                    placeholder="0300-1122334"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Role *</label>
                  <select
                    value={empRole}
                    onChange={(e) => setEmpRole(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white font-medium"
                  >
                    <option value="Cashier">Cashier</option>
                    <option value="Sales Staff">Sales Staff</option>
                    <option value="Accountant">Accountant</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={empEmail}
                  onChange={(e) => setEmpEmail(e.target.value)}
                  placeholder="asim@almadina.pk"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 text-xs font-semibold text-white bg-[#0F766E] hover:bg-[#115E59] rounded-lg cursor-pointer"
                >
                  Save & Invite Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
