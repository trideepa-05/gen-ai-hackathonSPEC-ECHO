"""
Dashboard Statistics Route
"""

from flask import Blueprint, jsonify
from datetime import datetime, timedelta
import random

stats_bp = Blueprint('stats', __name__)

# Mock data store
MOCK_CLAIMS = {
    'total': 1250,
    'fraudulent': 312,
    'legitimate': 938,
    'average_amount': 84500,
    'high_risk_count': 23,
    'moderate_risk_count': 45,
    'low_risk_count': 1182
}

@stats_bp.route('', methods=['GET'])
def get_stats():
    """Get dashboard statistics"""
    try:
        fraud_rate = (MOCK_CLAIMS['fraudulent'] / MOCK_CLAIMS['total']) * 100
        
        return jsonify({
            'total_claims': MOCK_CLAIMS['total'],
            'fraudulent_claims': MOCK_CLAIMS['fraudulent'],
            'legitimate_claims': MOCK_CLAIMS['legitimate'],
            'fraud_rate': round(fraud_rate, 1),
            'average_claim_amount': MOCK_CLAIMS['average_amount'],
            'risk_distribution': {
                'high': MOCK_CLAIMS['high_risk_count'],
                'moderate': MOCK_CLAIMS['moderate_risk_count'],
                'low': MOCK_CLAIMS['low_risk_count']
            },
            'model_accuracy': 0.894,
            'timestamp': datetime.utcnow().isoformat()
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@stats_bp.route('/trends', methods=['GET'])
def get_trends():
    """Get fraud trend data for charts"""
    try:
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
        trends = []
        
        for i, month in enumerate(months):
            trends.append({
                'month': month,
                'fraudulent': random.randint(10, 25),
                'legitimate': random.randint(70, 90)
            })
        
        return jsonify({
            'trends': trends,
            'period': 'Last 6 months'
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@stats_bp.route('/top-factors', methods=['GET'])
def get_top_factors():
    """Get top fraud risk factors"""
    try:
        factors = [
            {'name': 'Excessive claim amounts', 'percentage': 34},
            {'name': 'Severe accident claims', 'percentage': 22},
            {'name': 'Multiple prior claims', 'percentage': 18},
            {'name': 'Inconsistent documentation', 'percentage': 15},
            {'name': 'Suspicious timing', 'percentage': 11}
        ]
        
        return jsonify({'top_factors': factors}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
