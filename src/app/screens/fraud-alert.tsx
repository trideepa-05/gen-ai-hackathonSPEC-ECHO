import { useNavigate, useLocation } from "react-router";
import { Navbar } from "../components/navbar";
import { Chatbot } from "../components/chatbot";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { AlertTriangle, Eye, FileText } from "lucide-react";
import { RiskGauge } from "../components/charts/RiskGauge";
import { FraudAnalysisResult } from "../lib/fraudLogic";

export function FraudAlert() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const result = location.state?.result as FraudAnalysisResult | undefined;
  const formData = location.state?.formData || {};

  // Fallback values if no result provided
  const riskScore = result?.score || 87;
  const reasons = result?.reasons || [
    "Claim amount exceeds safe thresholds",
    "Multiple prior claims detected",
    "Pattern inconsistent with incident type",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B]">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Alert Header */}
        <div className="bg-gradient-to-r from-[#EF4444] to-[#DC2626] rounded-2xl p-8 mb-8 shadow-2xl">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white text-center mb-2">
            🚨 FRAUDULENT CLAIM DETECTED
          </h1>
          <p className="text-white/90 text-center text-lg">
            Our AI system has identified suspicious patterns in this claim
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Risk Score Card */}
          <div className="lg:col-span-1">
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="text-center">Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Risk Gauge */}
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      stroke="#FEE2E2"
                      strokeWidth="16"
                      fill="none"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      stroke="#EF4444"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray={`${(riskScore / 100) * 502.4} 502.4`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold text-[#EF4444]">{riskScore}%</span>
                    <span className="text-sm text-gray-600 mt-1">Risk Score</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-sm font-medium">Risk Level</span>
                    <span className="text-sm font-bold text-[#EF4444]">CRITICAL</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Confidence</span>
                    <span className="text-sm font-bold text-gray-700">94.3%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Severity</span>
                    <span className="text-sm font-bold text-gray-700">High</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Details Card */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-[#1E3A8A]">Fraud Indicators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Reasons */}
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-gray-800">Suspicious Patterns Detected:</h3>
                  <div className="space-y-3">
                    {reasons.map((reason, index) => (
                      <div key={index} className="flex items-start p-4 bg-red-50 rounded-lg border-l-4 border-[#EF4444]">
                        <AlertTriangle className="w-5 h-5 text-[#EF4444] mr-3 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">{reason}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Claim Details */}
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-gray-800">Claim Information:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Claimant Age</p>
                      <p className="font-semibold text-gray-800">{formData.age || "N/A"}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Vehicle Value</p>
                      <p className="font-semibold text-gray-800">${formData.vehiclePrice || "N/A"}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Claim Amount</p>
                      <p className="font-semibold text-[#EF4444]">${formData.claimAmount || "N/A"}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Previous Claims</p>
                      <p className="font-semibold text-gray-800">{formData.previousClaims || "N/A"}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    onClick={() => navigate("/network-graph")}
                    className="flex-1 h-12 bg-[#EF4444] hover:bg-[#DC2626] text-white"
                  >
                    <Eye className="mr-2 h-5 w-5" />
                    Investigate Claim
                  </Button>
                  <Button
                    onClick={() => navigate("/network-graph")}
                    variant="outline"
                    className="flex-1 h-12 border-[#EF4444] text-[#EF4444] hover:bg-red-50"
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    View Network Graph
                  </Button>
                </div>

                <Button
                  onClick={() => navigate("/claim-form")}
                  variant="ghost"
                  className="w-full text-gray-600 hover:text-gray-800"
                >
                  ← Analyze Another Claim
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Chatbot />
    </div>
  );
}
