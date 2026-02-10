import { Navbar } from "../components/navbar";
import { Chatbot } from "../components/chatbot";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { AlertTriangle, TrendingUp, CheckCircle2, Activity } from "lucide-react";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function Dashboard() {
  const monthlyData = [
    { month: "Jan", fraudulent: 12, legitimate: 88 },
    { month: "Feb", fraudulent: 18, legitimate: 82 },
    { month: "Mar", fraudulent: 15, legitimate: 85 },
    { month: "Apr", fraudulent: 23, legitimate: 77 },
    { month: "May", fraudulent: 19, legitimate: 81 },
    { month: "Jun", fraudulent: 21, legitimate: 79 },
  ];

  const riskDistribution = [
    { name: "High Risk", value: 23, color: "#EF4444" },
    { name: "Moderate Risk", value: 45, color: "#F59E0B" },
    { name: "Low Risk", value: 120, color: "#10B981" },
  ];

  const topRiskFactors = [
    { name: "Excessive claim amounts", percentage: 34, color: "#EF4444" },
    { name: "Severe accident claims", percentage: 22, color: "#F59E0B" },
    { name: "Multiple prior claims", percentage: 18, color: "#F59E0B" },
    { name: "Inconsistent documentation", percentage: 15, color: "#EF4444" },
    { name: "Suspicious timing", percentage: 11, color: "#F59E0B" },
  ];

  const metrics = [
    {
      title: "Today's Predictions",
      value: "156",
      change: "+12%",
      icon: Activity,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Average Risk Score",
      value: "34%",
      change: "-5%",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Fraudulent Claims",
      value: "23",
      change: "+3%",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Approved Claims",
      value: "133",
      change: "+8%",
      icon: CheckCircle2,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B]">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
          <p className="text-gray-400">Real-time fraud detection analytics and insights</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Stats Cards */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="bg-gradient-to-br from-[#EF4444] to-[#DC2626] text-white shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <AlertTriangle className="w-8 h-8" />
                  <span className="text-3xl font-bold">23</span>
                </div>
                <h3 className="font-semibold">High Risk</h3>
                <p className="text-sm text-white/80">Requires investigation</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-white shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Activity className="w-8 h-8" />
                  <span className="text-3xl font-bold">45</span>
                </div>
                <h3 className="font-semibold">Moderate Risk</h3>
                <p className="text-sm text-white/80">Under review</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#10B981] to-[#059669] text-white shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                  <span className="text-3xl font-bold">120</span>
                </div>
                <h3 className="font-semibold">Low Risk</h3>
                <p className="text-sm text-white/80">Automatically approved</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Metric Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <Card key={metric.title} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                          <Icon className={`w-6 h-6 ${metric.color}`} />
                        </div>
                        <span className="text-sm font-medium text-green-600">{metric.change}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-1">{metric.value}</h3>
                      <p className="text-sm text-gray-600">{metric.title}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Line Chart */}
              <Card className="bg-white shadow-xl">
                <CardHeader>
                  <CardTitle>Monthly Fraud Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="month" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "#FFF", 
                          border: "1px solid #E5E7EB",
                          borderRadius: "8px" 
                        }} 
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="fraudulent" 
                        stroke="#EF4444" 
                        strokeWidth={2}
                        name="Fraudulent"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="legitimate" 
                        stroke="#10B981" 
                        strokeWidth={2}
                        name="Legitimate"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Pie Chart */}
              <Card className="bg-white shadow-xl">
                <CardHeader>
                  <CardTitle>Risk Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={riskDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {riskDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Top Risk Factors */}
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <CardTitle>Top Risk Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topRiskFactors.map((factor, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">{factor.name}</span>
                        <span className="text-sm font-bold text-gray-800">{factor.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="h-2.5 rounded-full transition-all duration-500"
                          style={{
                            width: `${factor.percentage}%`,
                            backgroundColor: factor.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Chatbot />
    </div>
  );
}
