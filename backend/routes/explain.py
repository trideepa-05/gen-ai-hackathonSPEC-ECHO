"""
AI Explainability Route
"""

from flask import Blueprint, request, jsonify
from utils.explainability import get_risk_factors

explain_bp = Blueprint('explain', __name__)

@explain_bp.route('', methods=['POST'])
def explain_fraud():
    """
    Get explainable AI insights for fraud prediction
    
    Expected JSON:
    {
        "score": float (0-100),
        "level": str (LOW, MODERATE, HIGH),
        "data": {
            "age": int,
            "claim_amount": float,
            "previous_claims": int,
            "severity": str
        }
    }
    """
    try:
        data = request.get_json()
        
        # Get risk factors explanation
        factors = get_risk_factors(data)
        
        return jsonify({
            'risk_score': data.get('score', 0),
            'risk_level': data.get('level', 'MODERATE'),
            'top_factors': factors,
            'confidence': calculate_confidence(data.get('score', 0))
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def calculate_confidence(score):
    """Calculate model confidence based on score"""
    # Higher scores = higher confidence
    if score >= 80:
        return 0.95
    elif score >= 60:
        return 0.85
    elif score >= 40:
        return 0.75
    else:
        return 0.65
