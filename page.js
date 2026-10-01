'use client';
import { useState, useEffect } from 'react';

export default function StudioAdmin() {
  const [clients, setClients] = useState([]);
  const [view, setView] = useState('list');
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    customerName: '',
    mobile: '',
    address: '',
    eventDate: '',
    events: [{ event: '', date: '', time: '', location: '' }],
    services: [
      { service: 'Photo', days: '', quantity: '' },
      { service: 'Video', days: '', quantity: '' },
      { service: 'Drone', days: '', quantity: '' },
      { service: 'Reel', days: '', quantity: '' },
      { service: 'Invitation', days: '', quantity: '' },
      { service: 'Highlight', days: '', quantity: '' },
      { service: 'Candid', days: '', quantity: '' },
      { service: 'Cinematic', days: '', quantity: '' },
      { service: 'LED', days: '', quantity: '' },
      { service: 'Video Editing', days: '', quantity: '' },
      { service: 'Photo Social Media', days: '', quantity: '' },
    ],
    totalAmount: '',
    amountPaid: '',
    paidDate: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const saved = localStorage.getItem('tas_studio_clients');
    if (saved) {
      setClients(JSON.parse(saved));
    }
  }, []);

  const saveToStorage = (updatedClients) => {
    setClients(updatedClients);
    localStorage.setItem('tas_studio_clients', JSON.stringify(updatedClients));
  };

  const total = parseFloat(formData.totalAmount) || 0;
  const paid = parseFloat(formData.amountPaid) || 0;
  const balance = total - paid;

  const addEventRow = () => {
    setFormData({
      ...formData,
      events: [...formData.events, { event: '', date: '', time: '', location: '' }]
    });
  };

  const handleEventChange = (index, field, value) => {
    const newEvents = [...formData.events];
    newEvents[index][field] = value;
    setFormData({ ...formData, events: newEvents });
  };

  const handleServiceChange = (index, field, value) => {
    const newServices = [...formData.services];
    newServices[index][field] = value;
    setFormData({ ...formData, services: newServices });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customerName) {
      alert('कृपया कस्टमर का नाम दर्ज करें!');
      return;
    }

    const clientPayload = {
      ...formData,
      id: editingId || Date.now().toString(),
      balance,
      status: balance <= 0 ? 'Paid' : 'Due'
    };

    let updated;
    if (editingId) {
      updated = clients.map(c => c.id === editingId ? clientPayload : c);
    } else {
      updated = [clientPayload, ...clients];
    }

    saveToStorage(updated);
    setView('list');
    setEditingId(null);
    resetForm();
  };
  const resetForm = () => {
    setFormData({
      customerName: '',
      mobile: '',
      address: '',
      eventDate: '',
      events: [{ event: '', date: '', time: '', location: '' }],
      services: [
        { service: 'Photo', days: '', quantity: '' },
        { service: 'Video', days: '', quantity: '' },
        { service: 'Drone', days: '', quantity: '' },
        { service: 'Reel', days: '', quantity: '' },
        { service: 'Invitation', days: '', quantity: '' },
        { service: 'Highlight', days: '', quantity: '' },
        { service: 'Candid', days: '', quantity: '' },
        { service: 'Cinematic', days: '', quantity: '' },
        { service: 'LED', days: '', quantity: '' },
        { service: 'Video Editing', days: '', quantity: '' },
        { service: 'Photo Social Media', days: '', quantity: '' },
      ],
      totalAmount: '',
      amountPaid: '',
      paidDate: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0]
    });
  };

  const handleEdit = (client) => {
    setFormData(client);
    setEditingId(client.id);
    setView('form');
  };

  const handleDelete = (id) => {
    if (confirm('क्या आप वाकई इस बुकिंग को हटाना चाहते हैं?')) {
      const updated = clients.filter(c => c.id !== id);
      saveToStorage(updated);
    }
  };

  const totalClients = clients.length;
  const dueClients = clients.filter(c => c.balance > 0).length;
  const paidClients = clients.filter(c => c.balance <= 0 && c.totalAmount > 0).length;

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto mb-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-amber-500/40 p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row justify-between items-center print:hidden">
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="TAS Logo" className="w-20 h-20 object-contain rounded-2xl border-2 border-amber-500 bg-slate-950 p-1.5 shadow-xl" />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-extrabold tracking-wide text-amber-400">The Ankit Studio (TAS)</h1>
              <span className="bg-amber-500/20 text-amber-300 text-[10px] px-2.5 py-0.5 rounded-full font-bold border border-amber-500/30">ADMIN PANEL</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">✨ प्रोफेशनल मैरिज बुकिंग, लेजर और डिजिटल लेटरपैड मैनेजमेंट सिस्टम</p>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          {view === 'list' ? (
            <button onClick={() => { resetForm(); setEditingId(null); setView('form'); }} className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-extrabold px-6 py-3 rounded-xl shadow-xl transition transform hover:-translate-y-0.5 text-sm flex items-center space-x-2">
              <span>+ नई बुकिंग जोड़ें</span>
            </button>
          ) : (
            <button onClick={() => setView('list')} className="bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold px-5 py-2.5 rounded-xl text-sm transition border border-amber-500/30 shadow">
              ← डैशबोर्ड पर वापस जाएं
            </button>
          )}
        </div>
      </div>

      {view === 'list' && (
        <div className="max-w-6xl mx-auto space-y-8 print:hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/90 border border-slate-700 p-6 rounded-2xl shadow-xl relative overflow-hidden">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">कुल क्लाइंट (Total Clients)</p>
              <p className="text-4xl font-extrabold text-white mt-2">{totalClients}</p>
            </div>
            <div className="bg-slate-900/90 border border-red-500/30 p-6 rounded-2xl shadow-xl relative overflow-hidden">
              <p className="text-xs font-bold uppercase tracking-wider text-red-400">ड्यू अमाउंट वाले (Due Balance)</p>
              <p className="text-4xl font-extrabold text-red-500 mt-2">{dueClients}</p>
            </div>
            <div className="bg-slate-900/90 border border-green-500/30 p-6 rounded-2xl shadow-xl relative overflow-hidden">
              <p className="text-xs font-bold uppercase tracking-wider text-green-400">पेमेंट कम्प्लीट (Paid)</p>
              <p className="text-4xl font-extrabold text-green-500 mt-2">{paidClients}</p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
              <h2 className="font-bold text-base text-amber-300 flex items-center gap-2">
                <span>📑</span> सभी कस्टमर बुकिंग लेजर (तारीख के अनुसार)
              </h2>
            </div>
            {clients.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-sm">कोई बुकिंग दर्ज नहीं है। ऊपर दिए गए बटन से नई बुकिंग जोड़ना शुरू करें।</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-950 text-slate-300 uppercase text-xs tracking-wider border-b border-slate-700">
                      <th className="p-4">दिनांक</th>
                      <th className="p-4">कस्टमर का नाम</th>
                      <th className="p-4">मोबाइल नंबर</th>
                      <th className="p-4">कुल राशि</th>
                      <th className="p-4">एडवांस</th>
                      <th className="p-4">शेष (Due)</th>
                      <th className="p-4">स्टेटस</th>
                      <th className="p-4 text-center">एक्शन</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {clients.map((client) => (
                      <tr key={client.id} className="hover:bg-slate-800/50 transition">
                        <td className="p-4 text-slate-300 text-xs">{client.createdAt}</td>
                        <td className="p-4 font-bold text-white">{client.customerName}</td>
                        <td className="p-4 text-slate-300">{client.mobile || '---'}</td>
                        <td className="p-4 text-slate-200 font-semibold">₹ {client.totalAmount || 0}</td>
                        <td className="p-4 text-green-400 font-semibold">₹ {client.amountPaid || 0}</td>
                        <td className="p-4 text-red-400 font-extrabold">₹ {client.balance || 0}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${client.balance <= 0 ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                            {client.balance <= 0 ? 'PAID' : 'DUE'}
                          </span>
                        </td>
                        <td className="p-4 text-center space-x-2">
                          <button onClick={() => handleEdit(client)} className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs transition">संपादित करें</button>
                          <button onClick={() => { handleEdit(client); setTimeout(() => window.print(), 300); }} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition">🖨 PDF</button>
                          <button onClick={() => handleDelete(client.id)} className="bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white font-bold px-3 py-1.5 rounded-lg text-xs transition border border-red-500/30">हटाएं</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
      {view === 'form' && (
        <div className="max-w-4xl mx-auto space-y-8">
          <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-700 p-8 rounded-2xl shadow-2xl print:hidden space-y-6">
            <h2 className="text-lg font-bold text-amber-400 border-b border-slate-700 pb-3">✍️ बुकिंग विवरण और लेजर फॉर्म</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-2">कस्टमर का नाम *</label>
                <input type="text" required value={formData.customerName} onChange={(e) => setFormData({...formData, customerName: e.target.value})} className="w-full bg-slate-950 border border-slate-700 p-3 rounded-xl text-sm text-white focus:border-amber-500 outline-none" placeholder="पूरा नाम" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-2">मोबाइल नंबर</label>
                <input type="text" value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})} className="w-full bg-slate-950 border border-slate-700 p-3 rounded-xl text-sm text-white focus:border-amber-500 outline-none" placeholder="10 अंकों का नंबर" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-2">पूरा पता (Address)</label>
              <textarea value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full bg-slate-950 border border-slate-700 p-3 rounded-xl text-sm text-white focus:border-amber-500 outline-none" placeholder="पता"></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-2">बुकिंग/इवेंट की मुख्य दिनांक</label>
              <input type="date" value={formData.eventDate} onChange={(e) => setFormData({...formData, eventDate: e.target.value})} className="w-full bg-slate-950 border border-slate-700 p-3 rounded-xl text-sm text-white focus:border-amber-500 outline-none" />
            </div>

            <div className="border-t border-slate-700 pt-5">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-sm text-amber-300">इवेंट डिटेल्स (Event Details)</h3>
                <button type="button" onClick={addEventRow} className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-bold transition">+ नया इवेंट जोड़ें</button>
              </div>
              {formData.events.map((ev, idx) => (
                <div key={idx} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 bg-slate-950 p-3 rounded-xl border border-slate-700">
                  <input type="text" placeholder="इवेंट (जैसे: Sangeet)" value={ev.event} onChange={(e) => handleEventChange(idx, 'event', e.target.value)} className="bg-slate-900 border border-slate-700 p-2 rounded-lg text-xs text-white" />
                  <input type="date" value={ev.date} onChange={(e) => handleEventChange(idx, 'date', e.target.value)} className="bg-slate-900 border border-slate-700 p-2 rounded-lg text-xs text-white" />
                  <input type="text" placeholder="समय (जैसे: 7 PM)" value={ev.time} onChange={(e) => handleEventChange(idx, 'time', e.target.value)} className="bg-slate-900 border border-slate-700 p-2 rounded-lg text-xs text-white" />
                  <input type="text" placeholder="लोकेशन / वेन्यू" value={ev.location} onChange={(e) => handleEventChange(idx, 'location', e.target.value)} className="bg-slate-900 border border-slate-700 p-2 rounded-lg text-xs text-white" />
                </div>
              ))}
            </div>

            <div className="border-t border-slate-700 pt-5">
              <h3 className="font-bold text-sm text-amber-300 mb-3">बुकिंग सर्विसेज (Days & Quantity)</h3>
              <div className="space-y-1 max-h-56 overflow-y-auto p-3 bg-slate-950 rounded-xl border border-slate-700">
                {formData.services.map((srv, idx) => (
                  <div key={idx} className="grid grid-cols-3 gap-3 items-center text-xs">
                    <span className="font-semibold text-slate-200">{srv.service}</span>
                    <input type="text" placeholder="Days" value={srv.days} onChange={(e) => handleServiceChange(idx, 'days', e.target.value)} className="bg-slate-900 border border-slate-700 p-1.5 rounded-lg text-white text-center" />
                    <input type="text" placeholder="Qty" value={srv.quantity} onChange={(e) => handleServiceChange(idx, 'quantity', e.target.value)} className="bg-slate-900 border border-slate-700 p-1.5 rounded-lg text-white text-center" />
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-700 pt-5 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/60 p-5 rounded-xl border border-slate-700">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-2">कुल अमाउंट (Total Amount ₹)</label>
                <input type="number" value={formData.totalAmount} onChange={(e) => setFormData({...formData, totalAmount: e.target.value})} className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl font-bold text-amber-400 text-lg outline-none" placeholder="0" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-2">जमा अमाउंट (Amount Paid ₹)</label>
                <input type="number" value={formData.amountPaid} onChange={(e) => setFormData({...formData, amountPaid: e.target.value})} className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl font-bold text-green-400 text-lg outline-none" placeholder="0" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-2">भुगतान की तारीख (Payment Date)</label>
                <input type="date" value={formData.paidDate} onChange={(e) => setFormData({...formData, paidDate: e.target.value})} className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl text-sm text-white outline-none" />
              </div>
              <div className="flex flex-col justify-center bg-slate-900 p-3 rounded-xl border border-slate-700">
                <span className="text-xs text-slate-400 font-bold uppercase">शेष बकाया (Balance Due):</span>
                <span className={`text-xl font-black mt-1 ${balance > 0 ? 'text-red-400' : 'text-green-400'}`}>₹ {balance}</span>
              </div>
            </div>

            <div className="pt-4 flex gap-4">
              <button type="submit" className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold p-3.5 rounded-xl shadow-lg transition text-sm">
                💾 डेटा सेव करें और लेटरपैड देखें
              </button>
            </div>
          </form>

          {/* EXACT ROYAL LETTERHEAD PRINT PREVIEW WITH LARGER LOGO ONLY */}
          <div className="bg-white text-black p-6 rounded-xl shadow-2xl border-[3px] border-amber-500 relative max-w-[210mm] mx-auto print:p-2 print:border-[3px] print:border-amber-500 print:shadow-none">
            <style jsx global>{`
              @media print {
                body { background: white !important; color: black !important; -webkit-print-color-adjust: exact; }
                .print\\:hidden { display: none !important; }
                @page { size: A4 portrait; margin: 8mm; }
              }
            `}</style>

            {/* Top Header with Larger Logo Only on Left */}
            <div className="flex justify-between items-center border-b-2 border-amber-700 pb-2 mb-3">
              <div className="flex items-center">
                <img src="/logo.png" alt="TAS Logo" className="w-20 h-20 object-contain rounded-full border-2 border-amber-600 bg-white p-0.5 shadow-md" />
              </div>

              {/* Studio Contact Info */}
              <div className="text-right text-[11px] text-gray-800 space-y-0.5 font-semibold">
                <p>👤 Name :- Ankit Vyas</p>
                <p>📞 Mobile Number :- 6265234493</p>
                <p>✉ E-mail :- tasstudio@gmail.com</p>
                <p>📍 Address :- Nagda, District Ujjain, M.P. 456335.</p>
              </div>
            </div>

            {/* Customer Details */}
            <div className="mb-3">
              <div className="text-center mb-1 flex items-center justify-center gap-2">
                <span className="text-amber-700 text-xs">❖</span>
                <span className="inline-block bg-[#0B132B] text-amber-300 px-6 py-1 rounded-full text-[11px] font-black tracking-widest border border-amber-500 shadow-sm">
                  CUSTOMER DETAILS
                </span>
                <span className="text-amber-700 text-xs">❖</span>
              </div>
              <div className="space-y-1 text-xs text-gray-900 font-medium px-2">
                <div className="flex"><span className="w-32 font-bold text-gray-800">Customer Name</span><span className="w-4">:</span><span className="border-b border-dotted border-gray-500 flex-1">{formData.customerName || '---'}</span></div>
                <div className="flex"><span className="w-32 font-bold text-gray-800">Mobile Number</span><span className="w-4">:</span><span className="border-b border-dotted border-gray-500 flex-1">{formData.mobile || '---'}</span></div>
                <div className="flex"><span className="w-32 font-bold text-gray-800">Address</span><span className="w-4">:</span><span className="border-b border-dotted border-gray-500 flex-1">{formData.address || '---'}</span></div>
                <div className="flex"><span className="w-32 font-bold text-gray-800">Event Date</span><span className="w-4">:</span><span className="border-b border-dotted border-gray-500 flex-1">{formData.eventDate || '---'}</span></div>
              </div>
            </div>

            {/* Event Details */}
            <div className="mb-3">
              <div className="text-center mb-1 flex items-center justify-center gap-2">
                <span className="text-amber-700 text-xs">❖</span>
                <span className="inline-block bg-[#0B132B] text-amber-300 px-6 py-1 rounded-full text-[11px] font-black tracking-widest border border-amber-500 shadow-sm">
                  EVENT DETAILS
                </span>
                <span className="text-amber-700 text-xs">❖</span>
              </div>
              <table className="w-full text-[11px] border border-amber-800/40 text-center">
                <thead>
                  <tr className="bg-[#0B132B] text-white font-bold">
                    <th className="p-1 border border-amber-800/40">Event</th>
                    <th className="p-1 border border-amber-800/40">Date</th>
                    <th className="p-1 border border-amber-800/40">Time</th>
                    <th className="p-1 border border-amber-800/40">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.events.map((ev, i) => (
                    <tr key={i} className="border-b border-gray-300 h-6 font-medium bg-white">
                      <td className="p-1 border border-gray-300">{ev.event}</td>
                      <td className="p-1 border border-gray-300">{ev.date}</td>
                      <td className="p-1 border border-gray-300">{ev.time}</td>
                      <td className="p-1 border border-gray-300">{ev.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Booking Services */}
            <div className="mb-3">
              <div className="text-center mb-1 flex items-center justify-center gap-2">
                <span className="text-amber-700 text-xs">❖</span>
                <span className="inline-block bg-[#0B132B] text-amber-300 px-6 py-1 rounded-full text-[11px] font-black tracking-widest border border-amber-500 shadow-sm">
                  BOOKING SERVICES
                </span>
                <span className="text-amber-700 text-xs">❖</span>
              </div>
              <table className="w-full text-[11px] border border-amber-800/40">
                <thead>
                  <tr className="bg-[#0B132B] text-white font-bold">
                    <th className="p-1 border border-amber-800/40 text-left pl-2">Service</th>
                    <th className="p-1 border border-amber-800/40 text-center w-24">Days</th>
                    <th className="p-1 border border-amber-800/40 text-center w-24">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.services.map((srv, i) => (
                    <tr key={i} className="border-b border-gray-300 h-5">
                      <td className="p-1.5 border border-gray-300 font-bold pl-2">{srv.service}</td>
                      <td className="p-1.5 border border-gray-300 text-center font-semibold">{srv.days}</td>
                      <td className="p-1.5 border border-gray-300 text-center font-semibold">{srv.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Amounts Section */}
            <div className="space-y-1 text-xs mb-3 border-t-2 border-amber-700 pt-2 px-1">
              <div className="flex justify-between items-center border-b border-gray-300 pb-1">
                <span className="font-bold w-32">Total Amount</span>
                <span className="font-bold">₹ {formData.totalAmount || '0'}</span>
                <span className="text-[11px]">Date : {formData.createdAt}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-300 pb-1">
                <span className="font-bold w-32">Amount Paid</span>
                <span className="text-green-700 font-black">₹ {formData.amountPaid || '0'}</span>
                <span className="font-semibold text-blue-800 text-[11px]">Date : {formData.paidDate || '---'}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-300 pb-1">
                <span className="font-bold w-32">Balance Amount</span>
                <span className="text-red-700 font-black">₹ {balance}</span>
                <span className="font-bold text-[11px]">Due Status</span>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-2 border-t border-gray-300 flex flex-col items-center">
              <h3 className="text-lg font-black tracking-widest text-black">TAS</h3>
              <p className="text-[9px] font-bold text-gray-500">the ankit studio</p>
              <p className="text-amber-700 text-[9px] tracking-widest">════ ❦ ════</p>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 text-center print:hidden flex gap-4 justify-center">
              <button onClick={() => window.print()} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow transition">
                🖨 प्रिंट या PDF सेव करें (Logo Only)
              </button>
              <button onClick={() => setView('list')} className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition">
                वापस लिस्ट पर जाएं
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}