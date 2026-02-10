"""
AI Chatbot Route - Conversational fraud detection assistance
"""

from flask import Blueprint, request, jsonify
from utils.chatbot import generate_response

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('', methods=['POST'])
def chat():
    """
    AI Chatbot endpoint for fraud detection queries
    
    Expected JSON:
    {
        "message": str,
        "context": {
            "risk_score": float,
            "claim_data": object
        }
    }
    """
    try:
        data = request.get_json()
        message = data.get('message', '').strip()
        context = data.get('context', {})
        
        if not message:
            return jsonify({'error': 'Message cannot be empty'}), 400
        
        # Generate response
        response = generate_response(message, context)
        
        return jsonify({
            'reply': response,
            'timestamp': __import__('datetime').datetime.utcnow().isoformat()
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
