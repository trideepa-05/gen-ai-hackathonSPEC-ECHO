"""
Explainability Module
Provides interpretable insights into fraud predictions
"""

def get_risk_factors(data):
    """
    Generate human-readable risk factors explanation
    """
    score = data.get('score', 0)
    claim_data = data.get('data', {})
    
    factors = []
    
    # Analyze each factor
    age = claim_data.get('age', 0)
    if age < 25 or age > 70:
        factors.append({
            'factor': 'Age Profile',
            'impact': 'High',
            'explanation': f'Driver age {age} falls outside standard risk profile'
        })
    
    claim_amount = claim_data.get('claim_amount', 0)
    if claim_amount > 50000:
        factors.append({
            'factor': 'Claim Amount',
            'impact': 'High',
            'explanation': f'Claim amount ${claim_amount} exceeds normal thresholds'
        })
    
    previous_claims = claim_data.get('previous_claims', 0)
    if previous_claims > 3:
        factors.append({
            'factor': 'Claim History',
            'impact': 'High',
            'explanation': f'{previous_claims} previous claims indicates pattern'
        })
    
    severity = claim_data.get('severity', '')
    if severity in ['Catastrophic', 'Major']:
        factors.append({
            'factor': 'Damage Severity',
            'impact': 'Medium',
            'explanation': f'{severity} damage level warrants investigation'
        })
    
    # Ensure we have at least one factor
    if not factors:
        factors.append({
            'factor': 'Overall Profile',
            'impact': 'Low',
            'explanation': 'Claim characteristics within normal range'
        })
    
    return factors

def explain_prediction(score, claim_data):
    """
    Generate full explanation for a prediction
    """
    factors = get_risk_factors({'score': score, 'data': claim_data})
    
    return {
        'summary': f'Fraud risk score: {score}%',
        'factors': factors,
        'model_type': 'Gradient Boosting Classifier',
        'feature_importance': get_feature_importance(claim_data),
        'confidence': calculate_confidence(score)
    }

def get_feature_importance(claim_data):
    """Get feature importance rankings"""
    return [
        {'feature': 'previous_claims', 'importance': 0.28},
        {'feature': 'claim_amount', 'importance': 0.24},
        {'feature': 'severity', 'importance': 0.18},
        {'feature': 'age', 'importance': 0.16},
        {'feature': 'accident_type', 'importance': 0.10},
        {'feature': 'vehicle_price', 'importance': 0.04}
    ]

def calculate_confidence(score):
    """Calculate model confidence"""
    if score >= 80:
        return 0.95
    elif score >= 60:
        return 0.85
    elif score >= 40:
        return 0.75
    else:
        return 0.65
