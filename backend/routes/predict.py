"""
Fraud Prediction Route
"""

from flask import Blueprint, request, jsonify
from utils.fraud_engine import analyze_fraud_risk

predict_bp = Blueprint('predict', __name__)

@predict_bp.route('', methods=['POST'])
def predict_fraud():
    """
    Predict fraud risk for an insurance claim
    
    Expected JSON:
    {
        "age": int,
        "vehicle_price": str ($10k, $30k, $60k, $100k+),
        "claim_amount": float,
        "accident_type": str (Collision, Theft, Fire),
        "severity": str (Minor, Moderate, Major, Catastrophic),
        "previous_claims": int
    }
    """
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['age', 'vehicle_price', 'claim_amount', 
                          'accident_type', 'severity', 'previous_claims']
        
        if not all(field in data for field in required_fields):
            return jsonify({
                'error': 'Missing required fields',
                'required': required_fields
            }), 400
        
        # Analyze fraud risk
        result = analyze_fraud_risk({
            'age': int(data['age']),
            'vehicle_price': str(data['vehicle_price']),
            'claim_amount': float(data['claim_amount']),
            'accident_type': str(data['accident_type']),
            'severity': str(data['severity']),
            'previous_claims': int(data['previous_claims'])
        })
        
        return jsonify(result), 200
    
    except ValueError as e:
        return jsonify({'error': f'Invalid data type: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500
