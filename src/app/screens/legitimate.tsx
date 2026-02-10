import { useNavigate, useLocation } from "react-router";
import { Navbar } from "../components/navbar";
import { Chatbot } from "../components/chatbot";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { CheckCircle2, FileCheck, Download } from "lucide-react";

export function Legitimate() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData || {};

  const riskScore = 12; // Low risk score for legitimate claim

  const verificationChecks = [
    "Clean claim history verified",
    "Claim amount reasonable and verified",
    "No suspicious patterns detected",
    "Documentation complete and authentic",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B]">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-[#10B981] to-[#059669] rounded-2xl p-8 mb-8 shadow-2xl">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white text-center mb-2">
            ✅ CLAIM VERIFIED
          </h1>
          <p className="text-white/90 text-center text-lg">
            This claim has been approved by our AI fraud detection system
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
                      stroke="#D1FAE5"
                      strokeWidth="16"
                      fill="none"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      stroke="#10B981"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray={`${(riskScore / 100) * 502.4} 502.4`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold text-[#10B981]">{riskScore}%</span>
                    <span className="text-sm text-gray-600 mt-1">Risk Score</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium">Risk Level</span>
                    <span className="text-sm font-bold text-[#10B981]">LOW</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Confidence</span>
                    <span className="text-sm font-bold text-gray-700">98.7%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Status</span>
                    <span className="text-sm font-bold text-[#10B981]">Approved</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Details Card */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-[#1E3A8A]">Verification Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Verification Checks */}
                <div>
                  <h3 className="font-semibold text-lg mb-4 text-gray-800">All Checks Passed:</h3>
                  <div className="space-y-3">
                    {verificationChecks.map((check, index) => (
                      <div key={index} className="flex items-start p-4 bg-green-50 rounded-lg border-l-4 border-[#10B981]">
                        <CheckCircle2 className="w-5 h-5 text-[#10B981] mr-3 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">{check}</p>
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
                      <p className="font-semibold text-[#10B981]">${formData.claimAmount || "N/A"}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Previous Claims</p>
                      <p className="font-semibold text-gray-800">{formData.previousClaims || "N/A"}</p>
                    </div>
                  </div>
                </div>

                {/* Approval Notice */}
                <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-[#10B981]/20">
                  <h3 className="font-semibold text-lg text-[#10B981] mb-2">✓ Claim Approved</h3>
                  <p className="text-sm text-gray-700">
                    This claim has been automatically approved based on our AI analysis. The claimant will receive payment within 3-5 business days.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    onClick={() => navigate("/dashboard")}
                    className="flex-1 h-12 bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#10B981]/90 hover:to-[#059669]/90 text-white"
                  >
                    <FileCheck className="mr-2 h-5 w-5" />
                    Approve Claim
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 h-12 border-[#10B981] text-[#10B981] hover:bg-green-50"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Generate Report
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
