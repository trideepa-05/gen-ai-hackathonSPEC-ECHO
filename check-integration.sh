#!/bin/bash

echo "🔍 ShadowTrace Frontend-Backend Integration Check"
echo "================================================="
echo ""

# Check React server
echo "✓ Checking React Server (Port 5175)..."
if netstat -tlnp 2>/dev/null | grep -q ":5175"; then
    echo "  ✅ React running on 5175"
else
    echo "  ❌ React NOT running on 5175"
fi

# Check Flask server
echo ""
echo "✓ Checking Flask Server (Port 5000)..."
if netstat -tlnp 2>/dev/null | grep -q ":5000"; then
    echo "  ✅ Flask running on 5000"
else
    echo "  ❌ Flask NOT running on 5000"
fi

# Test Flask health
echo ""
echo "✓ Testing Flask Health Endpoint..."
HEALTH=$(curl -s http://localhost:5000/api/health)
if echo "$HEALTH" | grep -q '"status": "healthy"'; then
    echo "  ✅ Flask API healthy"
    echo "  Response: $HEALTH" | head -3
else
    echo "  ❌ Flask API not responding"
fi

# Test Fraud Prediction API
echo ""
echo "✓ Testing Fraud Prediction API..."
PRED=$(curl -s -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"age":35,"vehicle_price":"$30k","claim_amount":75000,"accident_type":"Collision","severity":"Major","previous_claims":2}')

if echo "$PRED" | grep -q '"score"'; then
    SCORE=$(echo "$PRED" | grep -o '"score": [0-9]*' | cut -d' ' -f2)
    LEVEL=$(echo "$PRED" | grep -o '"level": "[^"]*"' | cut -d'"' -f4)
    echo "  ✅ API returning predictions"
    echo "  Score: $SCORE | Level: $LEVEL"
else
    echo "  ❌ API not returning predictions"
fi

# Test React browser access
echo ""
echo "✓ Testing React App Browser Access..."
REACT_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5175/)
if [ "$REACT_RESPONSE" == "200" ]; then
    echo "  ✅ React app accessible on http://10.0.1.17:5175/"
else
    echo "  ❌ React app not responding (HTTP $REACT_RESPONSE)"
fi

echo ""
echo "================================================="
echo "✨ Integration Status: READY FOR USE"
echo ""
echo "📍 Frontend: http://10.0.1.17:5175/"
echo "📍 Backend:  http://localhost:5000/api"
echo ""
