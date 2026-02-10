import { useState, useCallback } from 'react';

const API_URL = (import.meta.env as Record<string, string>).VITE_API_URL || 'http://localhost:5000/api';

export interface ClaimData {
  age: number;
  vehiclePrice: string;
  claimAmount: number;
  accidentType: string;
  severity: string;
  previousClaims: number;
}

export interface FraudAnalysisResult {
  score: number;
  level: 'LOW' | 'MODERATE' | 'HIGH';
  reasons: string[];
  recommendation: string;
  confidence: number;
}

export function useFraudAnalysis() {
  const [result, setResult] = useState<FraudAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (data: ClaimData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Convert camelCase to snake_case for API
      const payload = {
        age: data.age,
        vehicle_price: data.vehiclePrice,
        claim_amount: data.claimAmount,
        accident_type: data.accidentType,
        severity: data.severity,
        previous_claims: data.previousClaims
      };

      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const analysisResult = await response.json();
      
      // Map API response to our type
      const result: FraudAnalysisResult = {
        score: analysisResult.score,
        level: analysisResult.level,
        reasons: analysisResult.reasons,
        recommendation: analysisResult.recommendation,
        confidence: analysisResult.confidence
      };

      setResult(result);
      sessionStorage.setItem('lastFraudAnalysis', JSON.stringify(result));
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Analysis failed';
      setError(errorMessage);
      console.error('Fraud analysis error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResult = useCallback(() => {
    setResult(null);
    setError(null);
    sessionStorage.removeItem('lastFraudAnalysis');
  }, []);

  const getLastResult = useCallback(() => {
    const stored = sessionStorage.getItem('lastFraudAnalysis');
    return stored ? JSON.parse(stored) : null;
  }, []);

  return {
    analyze,
    result,
    loading,
    error,
    clearResult,
    getLastResult,
  };
}
