from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
CORS(app)  # This allows your React app to communicate with Flask

# Use SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ckd_predictions.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Database model
class PatientData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    serum_creatinine = db.Column(db.Float)
    gfr = db.Column(db.Float)
    bun = db.Column(db.Float)
    serum_calcium = db.Column(db.Float)
    blood_pressure = db.Column(db.Float)
    water_intake = db.Column(db.Float)
    family_history = db.Column(db.String(50))
    weight_changes = db.Column(db.String(50))
    stress_level = db.Column(db.String(50))
    smoking = db.Column(db.String(50))
    alcohol = db.Column(db.String(50))
    painkiller_usage = db.Column(db.String(50))
    diet = db.Column(db.String(50))
    physical_activity = db.Column(db.String(50))
    prediction_result = db.Column(db.String(500))
    risk_level = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Create the database
with app.app_context():
    db.create_all()

@app.route('/api/predict', methods=['POST'])
def predict_ckd():
    try:
        data = request.get_json()
        print("Received data:", data)
        
        # Simple prediction logic
        risk_factors = 0
        factors = []
        
        if data.get('serum_creatinine') and float(data['serum_creatinine']) > 1.3:
            risk_factors += 2
            factors.append("High creatinine")
            
        if data.get('gfr') and float(data['gfr']) < 60:
            risk_factors += 3
            factors.append("Low GFR")
            
        if data.get('bun') and float(data['bun']) > 20:
            risk_factors += 1
            factors.append("High BUN")
            
        if data.get('family_history') == 'Yes':
            risk_factors += 1
            factors.append("Family history")
            
        if data.get('smoking') == 'Yes':
            risk_factors += 1
            factors.append("Smoking")
            
        # Determine risk level
        if risk_factors >= 5:
            prediction = "🚨 HIGH RISK: Possible CKD detected. Consult a nephrologist."
            risk_level = "high"
        elif risk_factors >= 3:
            prediction = "⚠️ MODERATE RISK: Early signs detected. Regular monitoring needed."
            risk_level = "moderate"
        elif risk_factors >= 1:
            prediction = "ℹ️ LOW RISK: Some risk factors present."
            risk_level = "low"
        else:
            prediction = "✅ NORMAL: No significant risk factors detected."
            risk_level = "normal"
        
        # Save to database
        patient = PatientData(
            serum_creatinine=float(data.get('serum_creatinine')) if data.get('serum_creatinine') else None,
            gfr=float(data.get('gfr')) if data.get('gfr') else None,
            bun=float(data.get('bun')) if data.get('bun') else None,
            serum_calcium=float(data.get('serum_calcium')) if data.get('serum_calcium') else None,
            blood_pressure=float(data.get('blood_pressure')) if data.get('blood_pressure') else None,
            water_intake=float(data.get('water_intake')) if data.get('water_intake') else None,
            family_history=data.get('family_history', ''),
            weight_changes=data.get('weight_changes', ''),
            stress_level=data.get('stress_level', ''),
            smoking=data.get('smoking', ''),
            alcohol=data.get('alcohol', ''),
            painkiller_usage=data.get('painkiller_usage', ''),
            diet=data.get('diet', ''),
            physical_activity=data.get('physical_activity', ''),
            prediction_result=prediction,
            risk_level=risk_level
        )
        
        db.session.add(patient)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'prediction': prediction,
            'risk_level': risk_level,
            'risk_factors': factors,
            'record_id': patient.id
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'CKD API is running!'})

if __name__ == '__main__':
    print("🚀 CKD Prediction API starting...")
    print("📊 Database: ckd_predictions.db")
    print("🌐 Server: http://localhost:5000")
    app.run(debug=True, port=5000)