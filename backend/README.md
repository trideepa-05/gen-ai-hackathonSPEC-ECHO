# ShadowTrace Backend API Documentation

## Quick Start

### Installation

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Running the Server

```bash
python app.py
```

Server will start on `http://localhost:5000`

---

## API Endpoints

### 1. Health Check
**GET** `/api/health`

Check if the API is running and healthy.

**Response:**
```json
{
  "status": "healthy",
  "service": "ShadowTrace Fraud Detection API",
  "timestamp": "2024-02-10T12:00:00",
  "version": "1.0.0"
}
```

---

### 2. Fraud Prediction
**POST** `/api/predict`

Analyze a claim and predict fraud risk.

**Request:**
```json
{
  "age": 35,
  "vehicle_price": "$30k",
  "claim_amount": 75000,
  "accident_type": "Collision",
  "severity": "Major",
  "previous_claims": 2
}
```

**Response:**
```json
{
  "score": 58,
  "level": "MODERATE",
  "reasons": [
    "Large claim amount ($50k+) warrants scrutiny",
    "Accident type (Collision) is high-risk pattern",
    "Frequent claims history indicates elevated risk"
  ],
  "details": {
    "age_risk": 0,
    "vehicle_price_risk": 5,
    "claim_amount_risk": 20,
    "severity_risk": 10,
    "previous_claims_risk": 16,
    "accident_type_risk": 10
  },
  "confidence": 0.85,
  "recommendation": "Request additional documentation and verification"
}
```

---

### 3. Get Explanation
**POST** `/api/explain`

Get detailed explanation for a fraud prediction.

**Request:**
```json
{
  "score": 58,
  "level": "MODERATE",
  "data": {
    "age": 35,
    "claim_amount": 75000,
    "previous_claims": 2,
    "severity": "Major"
  }
}
```

**Response:**
```json
{
  "risk_score": 58,
  "risk_level": "MODERATE",
  "top_factors": [
    {
      "factor": "Claim Amount",
      "impact": "High",
      "explanation": "Claim amount $75000 exceeds normal thresholds"
    },
    {
      "factor": "Damage Severity",
      "impact": "Medium",
      "explanation": "Major damage level warrants investigation"
    }
  ],
  "confidence": 0.85
}
```

---

### 4. Dashboard Statistics
**GET** `/api/stats`

Get dashboard statistics and metrics.

**Response:**
```json
{
  "total_claims": 1250,
  "fraudulent_claims": 312,
  "legitimate_claims": 938,
  "fraud_rate": 24.9,
  "average_claim_amount": 84500,
  "risk_distribution": {
    "high": 23,
    "moderate": 45,
    "low": 1182
  },
  "model_accuracy": 0.894,
  "timestamp": "2024-02-10T12:00:00"
}
```

---

### 5. Fraud Trends
**GET** `/api/stats/trends`

Get fraud trend data for charts.

**Response:**
```json
{
  "trends": [
    {"month": "Jan", "fraudulent": 18, "legitimate": 82},
    {"month": "Feb", "fraudulent": 21, "legitimate": 79},
    {"month": "Mar", "fraudulent": 15, "legitimate": 85}
  ],
  "period": "Last 6 months"
}
```

---

### 6. Top Risk Factors
**GET** `/api/stats/top-factors`

Get the most common fraud risk factors.

**Response:**
```json
{
  "top_factors": [
    {"name": "Excessive claim amounts", "percentage": 34},
    {"name": "Severe accident claims", "percentage": 22},
    {"name": "Multiple prior claims", "percentage": 18},
    {"name": "Inconsistent documentation", "percentage": 15},
    {"name": "Suspicious timing", "percentage": 11}
  ]
}
```

---

### 7. Network Graph
**GET** `/api/graph`

Get relationship network data for fraud pattern detection.

**Response:**
```json
{
  "nodes": [
    {"id": "C001", "type": "Customer", "label": "Customer 001", "size": 10},
    {"id": "V101", "type": "Vehicle", "label": "Vehicle V101", "size": 8},
    {"id": "CL001", "type": "Claim", "label": "Claim CL001", "size": 10}
  ],
  "edges": [
    {"source": "C001", "target": "V101", "label": "owns"},
    {"source": "C001", "target": "CL001", "label": "files"},
    {"source": "V101", "target": "CL001", "label": "involved_in"}
  ],
  "metadata": {
    "total_nodes": 8,
    "total_edges": 8,
    "node_types": ["Customer", "Vehicle", "Claim"]
  }
}
```

---

### 8. AI Chatbot
**POST** `/api/chat`

Chat with AI for fraud detection assistance.

**Request:**
```json
{
  "message": "Why is this claim marked high risk?",
  "context": {
    "risk_score": 85,
    "claim_data": {
      "age": 22,
      "claim_amount": 120000,
      "previous_claims": 5
    }
  }
}
```

**Response:**
```json
{
  "reply": "This claim shows multiple red flags. The combination of young driver age, large claim amount, and frequent claim history indicates potential fraud. Recommend investigation.",
  "timestamp": "2024-02-10T12:00:00"
}
```

---

## Error Handling

All endpoints follow standard REST error codes:

- **400** - Bad Request (invalid data)
- **404** - Not Found
- **500** - Internal Server Error

**Error Response Format:**
```json
{
  "error": "Description of the error"
}
```

---

## Integration with React Frontend

See the frontend documentation for API integration patterns. The React app will call these endpoints at:
- `http://localhost:5000/api/predict`
- `http://localhost:5000/api/stats`
- etc.

All responses follow a consistent JSON format for easy integration.
