const Payments = () => {
    const payments = [
        { id: 1, athlete: "John Doe", program: "Soccer Academy", amount: "₣120", date: "2024-01-15", status: "Paid", method: "Mobile Money" },
        { id: 2, athlete: "Sarah Smith", program: "Basketball Elite", amount: "₣150", date: "2024-01-14", status: "Paid", method: "Bank Transfer" },
        { id: 3, athlete: "Mike Johnson", program: "Swimming Basics", amount: "₣100", date: "2024-01-13", status: "Pending", method: "Cash" },
        { id: 4, athlete: "Emma Wilson", program: "Athletics Training", amount: "₣130", date: "2024-01-12", status: "Paid", method: "Mobile Money" },
        { id: 5, athlete: "David Brown", program: "Karate Beginners", amount: "₣110", date: "2024-01-11", status: "Failed", method: "Card" },
    ];

    const paymentStats = [
        { title: "Total Revenue", value: "₣4,850", change: "+12%", trend: "up" },
        { title: "Pending Payments", value: "₣850", change: "-5%", trend: "down" },
        { title: "Avg. Payment", value: "₣122", change: "+8%", trend: "up" },
        { title: "Success Rate", value: "92%", change: "+3%", trend: "up" },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Payments Management</h2>
                <div className="flex space-x-3">
                    <select className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg">
                        <option>All Programs</option>
                        <option>Soccer Academy</option>
                        <option>Basketball Elite</option>
                        <option>Swimming Basics</option>
                    </select>
                    <button className="bg-gradient-to-r from-bright-sun-400 to-bright-sun-500 text-gray-900 font-bold px-6 py-2 rounded-lg hover:shadow-lg transition-all">
                        Record Payment
                    </button>
                </div>
            </div>

            {/* Payment Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {paymentStats.map((stat, index) => (
                    <div key={index} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-6">
                        <p className="text-gray-400 text-sm">{stat.title}</p>
                        <div className="flex items-end justify-between mt-2">
                            <p className="text-white text-2xl font-bold">{stat.value}</p>
                            <span className={`text-sm ${stat.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                                {stat.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Payments */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden mb-8">
                <div className="p-4 border-b border-gray-700/50 flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-white">Recent Payments</h3>
                    <button className="text-bright-sun-400 hover:text-bright-sun-300">
                        View All →
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-800/70">
                            <tr>
                                <th className="text-left p-4 text-gray-300 font-semibold">Athlete</th>
                                <th className="text-left p-4 text-gray-300 font-semibold">Program</th>
                                <th className="text-left p-4 text-gray-300 font-semibold">Amount</th>
                                <th className="text-left p-4 text-gray-300 font-semibold">Date</th>
                                <th className="text-left p-4 text-gray-300 font-semibold">Status</th>
                                <th className="text-left p-4 text-gray-300 font-semibold">Method</th>
                                <th className="text-left p-4 text-gray-300 font-semibold">Receipt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment) => (
                                <tr key={payment.id} className="border-t border-gray-700/50 hover:bg-gray-700/30">
                                    <td className="p-4 text-white">{payment.athlete}</td>
                                    <td className="p-4 text-gray-300">{payment.program}</td>
                                    <td className="p-4 text-white font-bold">{payment.amount}</td>
                                    <td className="p-4 text-gray-300">{payment.date}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs ${
                                            payment.status === "Paid" 
                                                ? "bg-green-500/20 text-green-300" 
                                                : payment.status === "Pending"
                                                ? "bg-yellow-500/20 text-yellow-300"
                                                : "bg-red-500/20 text-red-300"
                                        }`}>
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-300">{payment.method}</td>
                                    <td className="p-4">
                                        <button className="text-blue-400 hover:text-blue-300 underline">
                                            Download
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Payment Methods Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-6">Payment Methods</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-gray-300">Mobile Money</span>
                                <span className="text-white">45%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-gray-300">Bank Transfer</span>
                                <span className="text-white">30%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-gray-300">Cash</span>
                                <span className="text-white">15%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-gray-300">Card</span>
                                <span className="text-white">10%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-purple-500 h-2 rounded-full" style={{ width: "10%" }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
                    <div className="space-y-4">
                        <button className="w-full text-left p-4 bg-gray-700/30 border border-gray-600/50 rounded-xl hover:border-bright-sun-400/30 transition-colors">
                            <div className="text-white font-medium">Send Payment Reminders</div>
                            <div className="text-gray-400 text-sm mt-1">Send reminders to parents with pending payments</div>
                        </button>
                        <button className="w-full text-left p-4 bg-gray-700/30 border border-gray-600/50 rounded-xl hover:border-bright-sun-400/30 transition-colors">
                            <div className="text-white font-medium">Generate Monthly Report</div>
                            <div className="text-gray-400 text-sm mt-1">Create and download monthly financial report</div>
                        </button>
                        <button className="w-full text-left p-4 bg-gray-700/30 border border-gray-600/50 rounded-xl hover:border-bright-sun-400/30 transition-colors">
                            <div className="text-white font-medium">View Outstanding Dues</div>
                            <div className="text-gray-400 text-sm mt-1">Check all pending payments and follow up</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payments;