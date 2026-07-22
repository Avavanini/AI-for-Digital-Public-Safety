import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import pickle
import os

print("Starting training sequence for Fraud Network Classifier...")

# Generate some dummy data representing transaction patterns
np.random.seed(42)
n_samples = 5000
data = pd.DataFrame({
    'tx_frequency_24h': np.random.randint(1, 50, n_samples),
    'device_trust_score': np.random.uniform(0.1, 1.0, n_samples),
    'location_velocity': np.random.uniform(0, 1000, n_samples), # km/h implied by logins
    'is_scam': np.random.choice([0, 1], p=[0.9, 0.1], size=n_samples)
})

# Feature engineering
X = data.drop('is_scam', axis=1)
y = data['is_scam']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print(f"Training on {len(X_train)} samples...")
clf = RandomForestClassifier(n_estimators=100, max_depth=10, random_state=42)
clf.fit(X_train, y_train)

preds = clf.predict(X_test)
acc = accuracy_score(y_test, preds)
print(f"Validation Accuracy: {acc:.4f}")

os.makedirs('models', exist_ok=True)
with open('models/fraud_rf_model.pkl', 'wb') as f:
    pickle.dump(clf, f)

print("Model saved to models/fraud_rf_model.pkl")
