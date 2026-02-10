"""
Chatbot Module
Conversational AI for fraud detection assistance
"""

import random

RESPONSES = {
    'high_risk': [
        'This claim shows multiple red flags and needs immediate investigation. The combination of {factors} indicates potential fraud.',
        'The claim risk is HIGH due to {factors}. I recommend denying this claim pending investigation.',
        'Several suspicious indicators detected: {factors}. This claim requires escalation to fraud team.'
    ],
    'moderate_risk': [
        'This claim has some concerning patterns. Please request additional documentation to verify the claim details.',
        'The risk is MODERATE. I recommend additional verification before processing.',
        'There are concerning factors present. Request supporting documentation from the claimant.'
    ],
    'low_risk': [
        'This claim appears legitimate. All indicators suggest approval is safe.',
        'The risk profile is LOW. Standard processes should suffice for this claim.',
        'This claim looks normal. No red flags detected.'
    ],
    'default': [
        'I can help analyze insurance fraud risks. What would you like to know?',
        'How can I assist you with fraud detection analysis?',
        'Feel free to ask about claim risk assessment or fraud indicators.'
    ]
}

def generate_response(message, context=None):
    """
    Generate intelligent chatbot response
    """
    context = context or {}
    message_lower = message.lower()
    
    # Keyword matching
    keywords = {
        'risk': 'risk',
        'fraud': 'fraud',
        'claim': 'claim',
        'score': 'score',
        'investigate': 'investigate',
        'approve': 'approve',
        'deny': 'deny'
    }
    
    # Check for keywords
    detected_intent = None
    for keyword, intent in keywords.items():
        if keyword in message_lower:
            detected_intent = intent
            break
    
    # Context-aware responses
    risk_score = context.get('risk_score', 0)
    
    if risk_score > 70:
        response_list = RESPONSES['high_risk']
        response = random.choice(response_list)
        return response.replace('{factors}', 'claim amount and claim history')
    
    elif risk_score > 40:
        response = random.choice(RESPONSES['moderate_risk'])
    
    elif detected_intent:
        if detected_intent in ['investigate', 'fraud']:
            response = 'To investigate this claim, review the risk factors and request supporting documentation.'
        elif detected_intent in ['approve', 'legitimate']:
            response = 'This claim can be approved if the risk assessment is within acceptable parameters.'
        else:
            response = random.choice(RESPONSES['default'])
    
    else:
        response = random.choice(RESPONSES['default'])
    
    return response

def get_risk_summary(risk_score, claim_type='general'):
    """Get brief risk summary"""
    if risk_score > 70:
        return f'HIGH RISK: Claim score {risk_score}% - Recommend investigation'
    elif risk_score > 40:
        return f'MODERATE RISK: Claim score {risk_score}% - Request verification'
    else:
        return f'LOW RISK: Claim score {risk_score}% - Safe to approve'
