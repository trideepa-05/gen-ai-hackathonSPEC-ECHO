"""
Fraud Analysis Engine
Core fraud detection logic
"""

def analyze_fraud_risk(claim_data):
    """
    Analyze fraud risk based on claim data
    Returns risk score, level, and detailed reasons
    """
    score = 0
    reasons = []
    details = {
        'age_risk': 0,
        'vehicle_price_risk': 0,
        'claim_amount_risk': 0,
        'severity_risk': 0,
        'previous_claims_risk': 0,
        'accident_type_risk': 0
    }
    
    # 1. Age analysis
    age = claim_data.get('age', 0)
    if age < 25:
        score += 20
        details['age_risk'] = 20
        reasons.append('Young driver (under 25) - higher risk profile')
    elif age > 70:
        score += 15
        details['age_risk'] = 15
        reasons.append('Senior driver (70+) - elevated risk indicators')
    
    # 2. Vehicle price analysis
    vehicle_price = claim_data.get('vehicle_price', '$10k')
    price_map = {
        '$10k': 0,
        '$30k': 5,
        '$60k': 15,
        '$100k+': 25
    }
    price_risk = price_map.get(vehicle_price, 0)
    score += price_risk
    details['vehicle_price_risk'] = price_risk
    if price_risk > 0:
        reasons.append(f'High-value vehicle ({vehicle_price}) increases fraud likelihood')
    
    # 3. Claim amount analysis
    claim_amount = claim_data.get('claim_amount', 0)
    if claim_amount > 50000:
        score += 40
        details['claim_amount_risk'] = 40
        reasons.append('Large claim amount ($50k+) warrants scrutiny')
    elif claim_amount > 30000:
        score += 20
        details['claim_amount_risk'] = 20
    
    # 4. Accident type analysis
    accident_type = claim_data.get('accident_type', 'Collision')
    accident_map = {
        'Theft': 35,
        'Fire': 30,
        'Collision': 10,
        'Vandalism': 15
    }
    accident_risk = accident_map.get(accident_type, 10)
    score += accident_risk
    details['accident_type_risk'] = accident_risk
    if accident_risk > 20:
        reasons.append(f'Accident type ({accident_type}) is high-risk pattern')
    
    # 5. Severity analysis
    severity = claim_data.get('severity', 'Moderate')
    severity_map = {
        'Catastrophic': 25,
        'Major': 10,
        'Moderate': 0,
        'Minor': 0
    }
    severity_risk = severity_map.get(severity, 0)
    score += severity_risk
    details['severity_risk'] = severity_risk
    
    # 6. Previous claims analysis
    previous_claims = claim_data.get('previous_claims', 0)
    if previous_claims > 3:
        multiplier = min(previous_claims * 8, 40)
        score += multiplier
        details['previous_claims_risk'] = multiplier
        reasons.append(f'Frequent claims history ({previous_claims} claims) indicates elevated risk')
    
    # Cap score at 100
    score = min(score, 100)
    
    # Determine risk level
    if score > 70:
        level = 'HIGH'
        if len(reasons) < 3:
            reasons.append('Combined risk factors exceed safe thresholds')
    elif score > 40:
        level = 'MODERATE'
        if len(reasons) < 2:
            reasons.append('Multiple moderate risk indicators detected')
    else:
        level = 'LOW'
        if len(reasons) == 0:
            reasons.append('Claim profile within normal parameters')
    
    return {
        'score': int(score),
        'level': level,
        'reasons': reasons[:3],  # Top 3 reasons
        'details': details,
        'confidence': get_confidence(score),
        'recommendation': get_recommendation(level)
    }

def get_confidence(score):
    """Calculate model confidence"""
    if score >= 80:
        return 0.95
    elif score >= 60:
        return 0.85
    elif score >= 40:
        return 0.75
    else:
        return 0.65

def get_recommendation(level):
    """Get actionable recommendation"""
    recommendations = {
        'HIGH': 'Recommend immediate investigation and claim denial',
        'MODERATE': 'Request additional documentation and verification',
        'LOW': 'Approve with standard review process'
    }
    return recommendations.get(level, 'Review required')
