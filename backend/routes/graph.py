"""
Graph Network Route - Relationship visualization
"""

from flask import Blueprint, jsonify
import random

graph_bp = Blueprint('graph', __name__)

@graph_bp.route('', methods=['GET'])
def get_graph_data():
    """Get network graph data for relationship visualization"""
    try:
        # Generate nodes
        nodes = [
            {'id': 'C001', 'type': 'Customer', 'label': 'Customer 001', 'size': 10},
            {'id': 'V101', 'type': 'Vehicle', 'label': 'Vehicle V101', 'size': 8},
            {'id': 'CL001', 'type': 'Claim', 'label': 'Claim CL001', 'size': 10},
            {'id': 'C002', 'type': 'Customer', 'label': 'Customer 002', 'size': 10},
            {'id': 'V102', 'type': 'Vehicle', 'label': 'Vehicle V102', 'size': 8},
            {'id': 'CL002', 'type': 'Claim', 'label': 'Claim CL002', 'size': 10},
            {'id': 'C003', 'type': 'Customer', 'label': 'Customer 003', 'size': 10},
            {'id': 'V103', 'type': 'Vehicle', 'label': 'Vehicle V103', 'size': 8},
        ]
        
        # Generate edges (relationships)
        edges = [
            {'source': 'C001', 'target': 'V101', 'label': 'owns'},
            {'source': 'C001', 'target': 'CL001', 'label': 'files'},
            {'source': 'V101', 'target': 'CL001', 'label': 'involved_in'},
            {'source': 'C002', 'target': 'V102', 'label': 'owns'},
            {'source': 'C002', 'target': 'CL002', 'label': 'files'},
            {'source': 'V102', 'target': 'CL002', 'label': 'involved_in'},
            {'source': 'C001', 'target': 'C003', 'label': 'related_to'},
            {'source': 'C003', 'target': 'V103', 'label': 'owns'},
        ]
        
        return jsonify({
            'nodes': nodes,
            'edges': edges,
            'metadata': {
                'total_nodes': len(nodes),
                'total_edges': len(edges),
                'node_types': ['Customer', 'Vehicle', 'Claim']
            }
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
