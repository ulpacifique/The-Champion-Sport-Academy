import { useState, useEffect } from "react";
import { paymentAPI } from "../Services/Api";
import {
    IconPlus,
    IconDownload,
    IconUpload,
    IconSearch,
    IconFilter,
    IconCreditCard,
    IconCash,
    IconBuildingBank,
    IconArrowUpRight,
    IconArrowDownRight
} from "@tabler/icons-react";

const PaymentManagement = () => {
    const [payments, setPayments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        childId: '',
        amount: '',
        paymentDate: new Date().toISOString().split('T')[0],
        status: 'PAID',
        paymentMethod: 'MOBILE_MONEY',
        notes: ''
    });

    // Helper for export
    const handleExport = async () => {
        try {
            const response = await paymentAPI.exportPayments();
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'payments.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Export failed", error);
        }
    };

    // Helper for import
    const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('file', file);
            try {
                await paymentAPI.importPayments(formData);
                fetchPayments(); // Refresh list
                alert("Import successful!");
            } catch (error) {
                console.error("Import failed", error);
                alert("Import failed. Check console.");
            }
        }
    };

    const handleRecordPayment = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await paymentAPI.recordPayment({
                ...formData,
                childId: Number(formData.childId),
                amount: Number(formData.amount)
            });
            setShowModal(false);
            fetchPayments();
            // Reset form
            setFormData({
                childId: '',
                amount: '',
                paymentDate: new Date().toISOString().split('T')[0],
                status: 'PAID',
                paymentMethod: 'MOBILE_MONEY',
                notes: ''
            });
        } catch (error) {
            console.error("Failed to record payment", error);
            alert("Failed to record payment. Check console.");
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            const response = await paymentAPI.getAllPayments();
            setPayments(response.data);
        } catch (error) {
            console.error("Failed to fetch payments", error);
        } finally {
            setLoading(false);
        }
    };

    const paymentStats = [
        { title: "Total Revenue", value: "RWF " + payments.reduce((acc, curr) => acc + (curr.status === 'PAID' ? curr.amount : 0), 0).toLocaleString(), change: "+12%", trend: "up" },
        { title: "Pending Payments", value: "RWF " + payments.reduce((acc, curr) => acc + (curr.status === 'PENDING' ? curr.amount : 0), 0).toLocaleString(), change: "-5%", trend: "down" },
        { title: "Success Rate", value: payments.length > 0 ? Math.round((payments.filter((p: any) => p.status === 'PAID').length / payments.length) * 100) + "%" : "0%", change: "+3%", trend: "up" },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">Payment Management</h2>
                    <p className="text-gray-400">Track and record athlete program payments</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-gradient-to-r from-bright-sun-200 to-bright-sun-300 text-gray-900 font-bold px-6 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
                    >
                        <IconPlus size={20} />
                        <span>Record Payment</span>
                    </button>
                    <button
                        onClick={handleExport}
                        className="bg-gray-700 text-white font-bold px-4 py-2 rounded-lg hover:bg-gray-600 transition-all flex items-center space-x-2"
                    >
                        <IconDownload size={20} />
                        <span>Export</span>
                    </button>
                    <div className="relative">
                        <input
                            type="file"
                            accept=".xlsx, .xls"
                            onChange={handleImport}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <button className="bg-gray-700 text-white font-bold px-4 py-2 rounded-lg hover:bg-gray-600 transition-all flex items-center space-x-2">
                            <IconUpload size={20} />
                            <span>Import</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Payment Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paymentStats.map((stat, index) => (
                    <div key={index} className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
                        <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                        <div className="flex items-end justify-between">
                            <p className="text-white text-2xl font-bold">{stat.value}</p>
                            <div className={`flex items-center text-sm ${stat.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                                {stat.trend === "up" ? <IconArrowUpRight size={16} /> : <IconArrowDownRight size={16} />}
                                <span>{stat.change}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-gray-700/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h3 className="text-xl font-semibold text-white">Recent Payments</h3>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <IconSearch className="absolute left-3 top-2.5 text-gray-500" size={18} />
                            <input
                                type="text"
                                placeholder="Search payments..."
                                className="pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-bright-sun-300 w-full md:w-64"
                            />
                        </div>
                        <button className="p-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-300 hover:text-white transition-colors">
                            <IconFilter size={20} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="p-12 text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-bright-sun-300 mb-4"></div>
                            <p className="text-gray-400">Loading payments...</p>
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-gray-900/50">
                                <tr>
                                    <th className="text-left p-4 text-gray-300 font-semibold border-b border-gray-700">Athlete</th>
                                    <th className="text-left p-4 text-gray-300 font-semibold border-b border-gray-700">Program</th>
                                    <th className="text-left p-4 text-gray-300 font-semibold border-b border-gray-700">Amount</th>
                                    <th className="text-left p-4 text-gray-300 font-semibold border-b border-gray-700">Date</th>
                                    <th className="text-left p-4 text-gray-300 font-semibold border-b border-gray-700">Status</th>
                                    <th className="text-left p-4 text-gray-300 font-semibold border-b border-gray-700">Method</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700/50">
                                {payments.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="p-12 text-center text-gray-500">
                                            <IconCreditCard size={48} className="mx-auto mb-4 opacity-20" />
                                            <p>No payments found in the records.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    payments.map((payment) => (
                                        <tr key={payment.id} className="hover:bg-gray-700/20 transition-colors">
                                            <td className="p-4">
                                                <div className="text-white font-medium">{payment.childName || 'Unknown'}</div>
                                                <div className="text-gray-500 text-xs">ID: #{payment.childId}</div>
                                            </td>
                                            <td className="p-4 text-gray-300">{payment.programName || '-'}</td>
                                            <td className="p-4">
                                                <div className="text-white font-bold">RWF {payment.amount?.toLocaleString()}</div>
                                            </td>
                                            <td className="p-4 text-gray-400 text-sm">
                                                {new Date(payment.paymentDate || payment.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${payment.status === "PAID"
                                                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                                    : payment.status === "PENDING"
                                                        ? "bg-bright-sun-300/20 text-bright-sun-300 border border-bright-sun-300/30"
                                                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                                                    }`}>
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center space-x-2 text-gray-300">
                                                    {payment.paymentMethod === 'MOBILE_MONEY' && <IconPlus size={16} className="text-blue-400" />}
                                                    {payment.paymentMethod === 'BANK_TRANSFER' && <IconBuildingBank size={16} className="text-purple-400" />}
                                                    {payment.paymentMethod === 'CASH' && <IconCash size={16} className="text-green-400" />}
                                                    <span className="text-sm">{payment.paymentMethod}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Payment Rules Card */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Quick Guide</h3>
                    <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                            <div className="mt-1 p-2 bg-bright-sun-300/10 rounded-lg text-bright-sun-300">
                                <IconCreditCard size={18} />
                            </div>
                            <div>
                                <h4 className="text-white font-medium">Recording Payments</h4>
                                <p className="text-gray-400 text-sm">Ensure the Child ID is correct before saving. Payments are tracked per athlete and program.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="mt-1 p-2 bg-blue-400/10 rounded-lg text-blue-400">
                                <IconDownload size={18} />
                            </div>
                            <div>
                                <h4 className="text-white font-medium">Exporting Records</h4>
                                <p className="text-gray-400 text-sm">Download full payment history in Excel format for offline reporting and auditing.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Summary by Method</h3>
                    <div className="space-y-4">
                        {['MOBILE_MONEY', 'BANK_TRANSFER', 'CASH', 'CARD'].map((method) => {
                            const total = payments.filter(p => p.paymentMethod === method && p.status === 'PAID').reduce((acc, curr) => acc + curr.amount, 0);
                            const count = payments.filter(p => p.paymentMethod === method).length;
                            const percentage = payments.length > 0 ? (count / payments.length) * 100 : 0;

                            return (
                                <div key={method}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-400">{method.replace('_', ' ')}</span>
                                        <span className="text-white font-medium">RWF {total.toLocaleString()}</span>
                                    </div>
                                    <div className="w-full bg-gray-700/50 rounded-full h-1.5">
                                        <div className="bg-bright-sun-300 h-1.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Record Payment Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 border border-gray-700 p-8 rounded-2xl w-full max-w-md shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-white">Record New Payment</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white transition-colors">
                                <IconPlus className="rotate-45" size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleRecordPayment} className="space-y-5">
                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-1.5">Child ID</label>
                                <input
                                    type="number"
                                    value={formData.childId}
                                    onChange={e => setFormData({ ...formData, childId: e.target.value })}
                                    className="w-full bg-gray-900/50 text-white rounded-xl p-3 border border-gray-700 focus:border-bright-sun-300 focus:ring-1 focus:ring-bright-sun-300 outline-none transition-all"
                                    required
                                    placeholder="e.g. 1024"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-1.5">Amount (RWF)</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-gray-500 font-medium">RWF</span>
                                    <input
                                        type="number"
                                        value={formData.amount}
                                        onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                        className="w-full bg-gray-900/50 text-white rounded-xl p-3 pl-14 border border-gray-700 focus:border-bright-sun-300 focus:ring-1 focus:ring-bright-sun-300 outline-none transition-all"
                                        required
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-1.5">Payment Date</label>
                                <input
                                    type="date"
                                    value={formData.paymentDate}
                                    onChange={e => setFormData({ ...formData, paymentDate: e.target.value })}
                                    className="w-full bg-gray-900/50 text-white rounded-xl p-3 border border-gray-700 focus:border-bright-sun-300 focus:ring-1 focus:ring-bright-sun-300 outline-none transition-all"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 text-sm font-medium mb-1.5">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={e => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full bg-gray-900/50 text-white rounded-xl p-3 border border-gray-700 focus:border-bright-sun-300 outline-none transition-all"
                                    >
                                        <option value="PAID">Paid</option>
                                        <option value="PENDING">Pending</option>
                                        <option value="OVERDUE">Overdue</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm font-medium mb-1.5">Method</label>
                                    <select
                                        value={formData.paymentMethod}
                                        onChange={e => setFormData({ ...formData, paymentMethod: e.target.value })}
                                        className="w-full bg-gray-900/50 text-white rounded-xl p-3 border border-gray-700 focus:border-bright-sun-300 outline-none transition-all"
                                    >
                                        <option value="MOBILE_MONEY">Mobile Money</option>
                                        <option value="BANK_TRANSFER">Bank Transfer</option>
                                        <option value="CASH">Cash</option>
                                        <option value="CARD">Card</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-1.5">Notes (Optional)</label>
                                <textarea
                                    value={formData.notes}
                                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                    className="w-full bg-gray-900/50 text-white rounded-xl p-3 border border-gray-700 focus:border-bright-sun-300 focus:ring-1 focus:ring-bright-sun-300 outline-none transition-all"
                                    rows={3}
                                    placeholder="Additional info..."
                                />
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 bg-gray-700 text-white font-bold py-3 rounded-xl hover:bg-gray-600 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-bright-sun-300 text-gray-900 font-bold py-3 rounded-xl hover:bg-bright-sun-200 shadow-lg shadow-bright-sun-300/20 transition-colors"
                                >
                                    Save Payment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentManagement;
