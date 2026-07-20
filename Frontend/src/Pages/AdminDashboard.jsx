import React, { useState } from 'react';

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const recruiters = [
    { id: 1, name: 'Zara Khan', company: 'TalentPro', email: 'zara@talentpro.com', status: 'Verified' },
    { id: 2, name: 'Omar Hussain', company: 'HireSmart', email: 'omar@hiresmart.com', status: 'Pending' },
    { id: 3, name: 'Ayesha Noor', company: 'FutureWorks', email: 'ayesha@futureworks.com', status: 'Verified' },
  ];

  const candidates = [
    { id: 1, name: 'Ahmed Ali', role: 'Frontend Developer', email: 'ahmed.ali@gmail.com', status: 'Interview' },
    { id: 2, name: 'Sara Malik', role: 'Data Analyst', email: 'sara.malik@gmail.com', status: 'Review' },
    { id: 3, name: 'Hassan Javed', role: 'DevOps Engineer', email: 'hassan.javed@gmail.com', status: 'New' },
  ];

  const filteredRecruiters = recruiters.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCandidates = candidates.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Portal</h1>
          <p className="text-slate-600">Manage recruiter accounts, candidate profiles, and review 
            hiring activity.</p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-3xl bg-slate-50 p-4 shadow-sm">
                <p className="text-sm text-slate-500">Recruiters</p>
                <p className="text-3xl font-semibold text-slate-900">{recruiters.length}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 shadow-sm">
                <p className="text-sm text-slate-500">Candidates</p>
                <p className="text-3xl font-semibold text-slate-900">{candidates.length}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 shadow-sm">
                <p className="text-sm text-slate-500">Open Reviews</p>
                <p className="text-3xl font-semibold text-slate-900">5</p>
              </div>
            </div>
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search recruiters or candidates"
                className="w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Recruiter Accounts</h2>
            <div className="space-y-4">
              {filteredRecruiters.map((recruiter) => (
                <div key={recruiter.id} className="rounded-3xl border border-slate-200 p-4 hover:bg-slate-50 transition">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{recruiter.name}</p>
                      <p className="text-sm text-slate-500">{recruiter.company}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-sm ${recruiter.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {recruiter.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-500">{recruiter.email}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">Candidate Profiles</h2>
            <div className="space-y-4">
              {
                filteredCandidates.map((candidate) => (
                  <div key={candidate.id} className="rounded-3xl border border-slate-200 p-4 hover:bg-slate-50
                    transition">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">{candidate.name}</p>
                        <p className="text-sm text-slate-500">{candidate.role}</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-sm ${candidate.status === 'Interview' ? 
                        'bg-violet-100 text-violet-700' : candidate.status === 'Review' ? 
                        'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-700'}`}>
                        {candidate.status}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-slate-500">{candidate.email}</p>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;