import json

class DigitalArrestDetector:
    def __init__(self):
        # In a real scenario, this would load a fine-tuned LLM or NLP model
        self.high_risk_keywords = ['cbi', 'customs', 'arrest', 'skype', 'safe account', 'rbi', 'fir']
        self.medium_risk_keywords = ['kyc', 'link', 'otp', 'block', 'suspend']
        
    def analyze_transcript(self, transcript: str) -> dict:
        """
        Analyzes a call transcript or message for Digital Arrest scam patterns.
        """
        transcript_lower = transcript.lower()
        
        # Simple heuristic pattern matching for demo purposes
        high_risk_matches = [kw for kw in self.high_risk_keywords if kw in transcript_lower]
        medium_risk_matches = [kw for kw in self.medium_risk_keywords if kw in transcript_lower]
        
        if len(high_risk_matches) >= 2:
            return {
                "risk_level": "CRITICAL",
                "confidence": 0.95,
                "flags": high_risk_matches,
                "advisory": "Disconnect immediately. Do not transfer funds. Report to Cybercrime portal (1930)."
            }
        elif len(high_risk_matches) == 1 or len(medium_risk_matches) >= 2:
            return {
                "risk_level": "MODERATE",
                "confidence": 0.75,
                "flags": high_risk_matches + medium_risk_matches,
                "advisory": "Suspicious pattern detected. Verify caller identity through official channels."
            }
            
        return {
            "risk_level": "LOW",
            "confidence": 0.90,
            "flags": [],
            "advisory": "No immediate threats detected, but always remain vigilant."
        }

if __name__ == "__main__":
    detector = DigitalArrestDetector()
    sample_transcript = "Hello this is CBI officer. We found a parcel with your name containing illegal items. Do not disconnect the skype call."
    result = detector.analyze_transcript(sample_transcript)
    print(json.dumps(result, indent=2))
