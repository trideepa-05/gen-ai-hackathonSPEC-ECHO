import { useState } from "react";
import { Navbar } from "../components/navbar";
import { Chatbot } from "../components/chatbot";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Search, ZoomIn, ZoomOut, AlertTriangle, User, DollarSign, FileText } from "lucide-react";

export function NetworkGraph() {
  const [selectedNode, setSelectedNode] = useState({
    name: "John Doe",
    risk: 92,
    connections: 14,
    totalClaims: "$125,000",
    flags: 7,
  });

  const connections = [
    { name: "Sarah Johnson", risk: 78, relation: "Shared Address" },
    { name: "Mike Peters", risk: 85, relation: "Same Accident" },
    { name: "ABC Auto Repair", risk: 91, relation: "Service Provider" },
    { name: "Elite Insurance", risk: 45, relation: "Previous Carrier" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B]">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Fraud Network Analysis</h1>
          <p className="text-gray-400">Interactive visualization of claim relationships</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Graph Area */}
          <div className="lg:col-span-3">
            <Card className="bg-[#1E293B] shadow-xl border-[#1E3A8A]">
              <CardHeader className="border-b border-[#1E3A8A] pb-4">
                <div className="flex flex-wrap items-center gap-4">
                  {/* Search */}
                  <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search nodes..."
                        className="pl-10 bg-[#0F172A] border-[#1E3A8A] text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>

                  {/* Risk Level Filter */}
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px] bg-[#0F172A] border-[#1E3A8A] text-white">
                      <SelectValue placeholder="Risk Level" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1E293B] border-[#1E3A8A] text-white">
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="high">High Risk</SelectItem>
                      <SelectItem value="medium">Medium Risk</SelectItem>
                      <SelectItem value="low">Low Risk</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Date Filter */}
                  <Select defaultValue="30days">
                    <SelectTrigger className="w-[180px] bg-[#0F172A] border-[#1E3A8A] text-white">
                      <SelectValue placeholder="Time Range" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1E293B] border-[#1E3A8A] text-white">
                      <SelectItem value="7days">Last 7 Days</SelectItem>
                      <SelectItem value="30days">Last 30 Days</SelectItem>
                      <SelectItem value="90days">Last 90 Days</SelectItem>
                      <SelectItem value="year">This Year</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Zoom Controls */}
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline" className="bg-[#0F172A] border-[#1E3A8A] text-white hover:bg-[#1E3A8A]">
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="bg-[#0F172A] border-[#1E3A8A] text-white hover:bg-[#1E3A8A]">
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {/* Network Graph Visualization Area */}
                <div className="relative bg-[#0F172A] rounded-xl p-8 min-h-[600px] border border-[#1E3A8A]">
                  {/* Graph visualization placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Central Node */}
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#EF4444] to-[#DC2626] flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform">
                        <div className="text-center text-white">
                          <User className="w-8 h-8 mx-auto mb-2" />
                          <p className="text-sm font-semibold">John Doe</p>
                          <p className="text-xs">Risk: 92%</p>
                        </div>
                      </div>

                      {/* Connected Nodes */}
                      {[
                        { angle: 0, color: "from-[#F59E0B] to-[#D97706]", name: "Sarah J.", risk: 78 },
                        { angle: 90, color: "from-[#EF4444] to-[#DC2626]", name: "Mike P.", risk: 85 },
                        { angle: 180, color: "from-[#EF4444] to-[#DC2626]", name: "ABC Auto", risk: 91 },
                        { angle: 270, color: "from-[#10B981] to-[#059669]", name: "Elite Ins.", risk: 45 },
                      ].map((node, index) => {
                        const radius = 180;
                        const x = Math.cos((node.angle * Math.PI) / 180) * radius;
                        const y = Math.sin((node.angle * Math.PI) / 180) * radius;
                        
                        return (
                          <div key={index}>
                            {/* Connection Line */}
                            <svg
                              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                              style={{ width: "400px", height: "400px" }}
                            >
                              <line
                                x1="200"
                                y1="200"
                                x2={200 + x}
                                y2={200 + y}
                                stroke="#3B82F6"
                                strokeWidth="2"
                                strokeDasharray="5,5"
                                opacity="0.5"
                              />
                            </svg>

                            {/* Node */}
                            <div
                              className="absolute top-1/2 left-1/2 cursor-pointer hover:scale-110 transition-transform"
                              style={{
                                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                              }}
                            >
                              <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${node.color} flex items-center justify-center shadow-xl`}>
                                <div className="text-center text-white text-xs">
                                  <p className="font-semibold">{node.name}</p>
                                  <p className="text-[10px]">{node.risk}%</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="absolute bottom-6 left-6 bg-[#1E293B] rounded-lg p-4 border border-[#1E3A8A]">
                    <h4 className="text-white font-semibold text-sm mb-3">Legend</h4>
                    <div className="space-y-2 text-xs text-gray-300">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div>
                        <span>High Risk (70%+)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
                        <span>Medium Risk (40-70%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
                        <span>Low Risk (&lt;40%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-0.5 border-t-2 border-dashed border-[#3B82F6]"></div>
                        <span>Connection</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Selected Node Details */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="bg-white shadow-xl">
              <CardHeader className="border-b pb-4">
                <CardTitle className="text-lg">Selected Node</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {/* Profile */}
                <div className="text-center pb-4 border-b">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#EF4444] to-[#DC2626] flex items-center justify-center mx-auto mb-3">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800">{selectedNode.name}</h3>
                  <p className="text-sm text-gray-600">Primary Claimant</p>
                </div>

                {/* Risk Score */}
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Risk Score</span>
                    <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
                  </div>
                  <p className="text-3xl font-bold text-[#EF4444]">{selectedNode.risk}%</p>
                </div>

                {/* Stats */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-600 mr-2" />
                      <span className="text-sm text-gray-700">Connections</span>
                    </div>
                    <span className="font-semibold text-gray-800">{selectedNode.connections}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 text-gray-600 mr-2" />
                      <span className="text-sm text-gray-700">Total Claims</span>
                    </div>
                    <span className="font-semibold text-gray-800">{selectedNode.totalClaims}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 text-gray-600 mr-2" />
                      <span className="text-sm text-gray-700">Red Flags</span>
                    </div>
                    <span className="font-semibold text-[#EF4444]">{selectedNode.flags}</span>
                  </div>
                </div>

                {/* Connections List */}
                <div>
                  <h4 className="font-semibold text-sm text-gray-800 mb-3">Connected Entities</h4>
                  <div className="space-y-2">
                    {connections.map((conn, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-800">{conn.name}</span>
                          <span className={`text-xs font-semibold ${conn.risk > 70 ? "text-[#EF4444]" : "text-gray-600"}`}>
                            {conn.risk}%
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">{conn.relation}</p>
                      </div>
                    ))}
                  </div>
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
