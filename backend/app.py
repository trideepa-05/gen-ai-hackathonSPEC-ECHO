"""
ShadowTrace - AI-Powered Insurance Fraud Detection Backend
Flask API Server
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import json
import os
from dotenv import load_dotenv

# Import route blueprints
from routes.predict import predict_bp
from routes.explain import explain_bp
from routes.stats import stats_bp
from routes.graph import graph_bp
from routes.chat import chat_bp

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Configuration
app.config['JSON_SORT_KEYS'] = False
app.config['DEBUG'] = os.getenv('FLASK_ENV') == 'development'

# Register blueprints
app.register_blueprint(predict_bp, url_prefix='/api/predict')
app.register_blueprint(explain_bp, url_prefix='/api/explain')
app.register_blueprint(stats_bp, url_prefix='/api/stats')
app.register_blueprint(graph_bp, url_prefix='/api/graph')
app.register_blueprint(chat_bp, url_prefix='/api/chat')

# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint for monitoring"""
    return jsonify({
        'status': 'healthy',
        'service': 'ShadowTrace Fraud Detection API',
        'timestamp': datetime.utcnow().isoformat(),
        'version': '1.0.0'
    }), 200

# Root endpoint
@app.route('/', methods=['GET'])
def index():
    """Welcome endpoint"""
    return jsonify({
        'message': 'ShadowTrace - AI Insurance Fraud Detection API',
        'version': '1.0.0',
        'endpoints': [
            '/api/health',
            '/api/predict',
            '/api/explain',
            '/api/stats',
            '/api/graph',
            '/api/chat'
        ]
    }), 200

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

@app.errorhandler(400)
def bad_request(error):
    return jsonify({'error': 'Bad request'}), 400

if __name__ == '__main__':
    port = int(os.getenv('FLASK_PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=app.config['DEBUG'])
