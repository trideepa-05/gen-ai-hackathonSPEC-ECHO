import { useState } from "react";
import { useNavigate } from "react-router";
import { Navbar } from "../components/navbar";
import { Chatbot } from "../components/chatbot";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Loader2, AlertTriangle, CheckCircle2 } from "lucide-react";

export function ClaimForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    age: "",
    vehiclePrice: "",
    claimAmount: "",
    accidentType: "",
    severity: "",
    previousClaims: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate AI analysis
    setTimeout(() => {
      setIsLoading(false);
      
      // Simple logic to determine if claim is fraudulent
      const claimAmount = parseFloat(formData.claimAmount);
      const vehiclePrice = parseFloat(formData.vehiclePrice);
      const previousClaims = parseInt(formData.previousClaims);
      
      const isFraudulent = 
        claimAmount > vehiclePrice * 0.8 || 
        previousClaims > 3 || 
        formData.severity === "catastrophic";
      
      if (isFraudulent) {
        navigate("/fraud-alert", { state: { formData } });
      } else {
        navigate("/legitimate", { state: { formData } });
      }
    }, 2000);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getRiskPreview = () => {
    if (!formData.claimAmount || !formData.vehiclePrice) return null;
    
    const claimAmount = parseFloat(formData.claimAmount);
    const vehiclePrice = parseFloat(formData.vehiclePrice);
    const previousClaims = parseInt(formData.previousClaims) || 0;
    
    let risk = 0;
    if (claimAmount > vehiclePrice * 0.8) risk += 40;
    if (previousClaims > 3) risk += 30;
    if (formData.severity === "catastrophic") risk += 30;
    
    return Math.min(risk, 100);
  };

  const riskScore = getRiskPreview();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-[#1E293B]">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Card */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="text-3xl text-[#1E3A8A]">Analyze Insurance Claim</CardTitle>
                <CardDescription>Enter claim details to assess fraud risk using AI</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Age */}
                    <div>
                      <Label htmlFor="age">Age of Claimant</Label>
                      <Input
                        id="age"
                        type="number"
                        min="20"
                        max="80"
                        placeholder="25"
                        value={formData.age}
                        onChange={(e) => updateFormData("age", e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>

                    {/* Vehicle Price */}
                    <div>
                      <Label htmlFor="vehiclePrice">Vehicle Price</Label>
                      <Select onValueChange={(value) => updateFormData("vehiclePrice", value)} required>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select price range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10000">$10,000 - $20,000</SelectItem>
                          <SelectItem value="30000">$30,000 - $50,000</SelectItem>
                          <SelectItem value="60000">$60,000 - $80,000</SelectItem>
                          <SelectItem value="100000">$100,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Claim Amount */}
                    <div>
                      <Label htmlFor="claimAmount">Claim Amount ($)</Label>
                      <Input
                        id="claimAmount"
                        type="number"
                        placeholder="15000"
                        value={formData.claimAmount}
                        onChange={(e) => updateFormData("claimAmount", e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>

                    {/* Accident Type */}
                    <div>
                      <Label htmlFor="accidentType">Accident Type</Label>
                      <Select onValueChange={(value) => updateFormData("accidentType", value)} required>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="collision">Collision</SelectItem>
                          <SelectItem value="theft">Theft</SelectItem>
                          <SelectItem value="fire">Fire</SelectItem>
                          <SelectItem value="vandalism">Vandalism</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Severity */}
                    <div>
                      <Label htmlFor="severity">Damage Severity</Label>
                      <Select onValueChange={(value) => updateFormData("severity", value)} required>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="minor">Minor</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="major">Major</SelectItem>
                          <SelectItem value="catastrophic">Catastrophic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Previous Claims */}
                    <div>
                      <Label htmlFor="previousClaims">Previous Claims</Label>
                      <Input
                        id="previousClaims"
                        type="number"
                        min="0"
                        max="10"
                        placeholder="0"
                        value={formData.previousClaims}
                        onChange={(e) => updateFormData("previousClaims", e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] hover:from-[#1E3A8A]/90 hover:to-[#3B82F6]/90 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analyzing Risk...
                      </>
                    ) : (
                      "ANALYZE RISK"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Preview Card */}
          <div className="lg:col-span-1">
            <Card className="bg-white shadow-xl sticky top-24">
              <CardHeader>
                <CardTitle>Risk Preview</CardTitle>
                <CardDescription>Real-time risk assessment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Risk Gauge */}
                <div className="relative w-48 h-48 mx-auto">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      stroke="#E5E7EB"
                      strokeWidth="12"
                      fill="none"
                    />
                    {riskScore !== null && (
                      <circle
                        cx="96"
                        cy="96"
                        r="80"
                        stroke={riskScore > 50 ? "#EF4444" : "#10B981"}
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${(riskScore / 100) * 502.4} 502.4`}
                        className="transition-all duration-500"
                      />
                    )}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-[#1E3A8A]">
                      {riskScore ?? "-"}%
                    </span>
                    <span className="text-sm text-gray-600">Risk Score</span>
                  </div>
                </div>

                {/* Risk Indicators */}
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    {riskScore !== null && riskScore > 50 ? (
                      <AlertTriangle className="w-5 h-5 text-[#EF4444] mr-2" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-[#10B981] mr-2" />
                    )}
                    <span className="text-gray-700">
                      {riskScore !== null && riskScore > 50 ? "High Risk Detected" : "Low Risk Profile"}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-[#1E3A8A]">
                    💡 Our AI analyzes multiple factors including claim history, damage severity, and claim-to-value ratios to detect potential fraud.
                  </p>
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
