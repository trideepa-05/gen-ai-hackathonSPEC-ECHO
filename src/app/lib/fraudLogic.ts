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
  details: {
    ageRiskIndicators: number;
    vehiclePriceRisk: number;
    claimAmountRisk: number;
    severityRisk: number;
    previousClaimsRisk: number;
  };
}

export function analyzeClaim(data: ClaimData): FraudAnalysisResult {
  let score = 0;
  const reasons: string[] = [];
  const details = {
    ageRiskIndicators: 0,
    vehiclePriceRisk: 0,
    claimAmountRisk: 0,
    severityRisk: 0,
    previousClaimsRisk: 0,
  };

  // Age analysis (high risk for very young and elderly drivers)
  if (data.age < 25) {
    score += 20;
    details.ageRiskIndicators = 20;
    reasons.push('Younger drivers (under 25) have higher claim rates');
  } else if (data.age > 70) {
    score += 15;
    details.ageRiskIndicators = 15;
    reasons.push('Elderly drivers (70+) show elevated risk patterns');
  }

  // Vehicle price analysis
  const priceMap: { [key: string]: number } = {
    '$10k': 0,
    '$30k': 5,
    '$60k': 15,
    '$100k+': 25,
  };
  const priceRisk = priceMap[data.vehiclePrice] || 0;
  score += priceRisk;
  details.vehiclePriceRisk = priceRisk;
  if (priceRisk > 0) {
    reasons.push(`High-value vehicle ($${data.vehiclePrice}) increases fraud likelihood`);
  }

  // Claim amount analysis
  if (data.claimAmount > 50000) {
    score += 40;
    details.claimAmountRisk = 40;
    reasons.push('Large claim amounts ($50k+) warrant additional scrutiny');
  } else if (data.claimAmount > 30000) {
    score += 20;
    details.claimAmountRisk = 20;
  }

  // Accident type analysis
  const accidentTypeRisk: { [key: string]: number } = {
    Theft: 35,
    Fire: 30,
    Collision: 10,
  };
  const accidentRisk = accidentTypeRisk[data.accidentType] || 0;
  score += accidentRisk;

  // Severity analysis
  const severityRisk: { [key: string]: number } = {
    Catastrophic: 25,
    Moderate: 10,
    Minor: 5,
  };
  const sevRisk = severityRisk[data.severity] || 0;
  score += sevRisk;
  details.severityRisk = sevRisk;

  // Previous claims analysis
  if (data.previousClaims > 3) {
    const multiplier = Math.min(data.previousClaims * 8, 40);
    score += multiplier;
    details.previousClaimsRisk = multiplier;
    reasons.push(
      `Frequent claims history (${data.previousClaims} claims) indicates elevated risk`
    );
  }

  // Cap the score at 100
  score = Math.min(score, 100);

  // Determine risk level
  let level: 'LOW' | 'MODERATE' | 'HIGH' = 'LOW';
  if (score > 70) {
    level = 'HIGH';
    if (reasons.length < 3) {
      reasons.push('Combined risk factors exceed safe thresholds');
    }
  } else if (score > 40) {
    level = 'MODERATE';
    if (reasons.length < 2) {
      reasons.push('Multiple moderate risk indicators detected');
    }
  }

  // Ensure we have at least one reason
  if (reasons.length === 0) {
    reasons.push('Claim profile within normal parameters');
  }

  return {
    score: Math.round(score),
    level,
    reasons: reasons.slice(0, 3),
    details,
  };
}

export function getRiskColor(level: 'LOW' | 'MODERATE' | 'HIGH'): string {
  switch (level) {
    case 'HIGH':
      return '#EF4444';
    case 'MODERATE':
      return '#F59E0B';
    case 'LOW':
      return '#10B981';
    default:
      return '#6B7280';
  }
}

export function getRiskBgClass(level: 'LOW' | 'MODERATE' | 'HIGH'): string {
  switch (level) {
    case 'HIGH':
      return 'bg-red-500/10 border-red-500/30';
    case 'MODERATE':
      return 'bg-amber-500/10 border-amber-500/30';
    case 'LOW':
      return 'bg-green-500/10 border-green-500/30';
    default:
      return 'bg-gray-500/10 border-gray-500/30';
  }
}
