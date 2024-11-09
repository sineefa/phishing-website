import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# Use GPU if available, otherwise CPU
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Load the model and tokenizer from local path
model_path = "C:/Users/sinee/OneDrive/Desktop/model"
model = AutoModelForSequenceClassification.from_pretrained(model_path).to(device)

# model_path = "C:/Users/susyk/OneDrive/Desktop/model"
# model = AutoModelForSequenceClassification.from_pretrained(model_path).to(device)
tokenizer = AutoTokenizer.from_pretrained(model_path)

def predict_url(url):
    try:
        # Tokenize the input URL
        inputs = tokenizer(url, return_tensors="pt", truncation=True, padding=True, max_length=512).to(device)
        
        # Make the prediction
        with torch.no_grad():
            outputs = model(**inputs)
        
        # Get the prediction result (0 for 'Benign', 1 for 'Phishing')
        prediction = outputs.logits.argmax(dim=1).item()
        
        # Return 1 for Phishing, 0 for Benign
        print("a")
        print(prediction)
        return prediction
    
    except Exception as e:
        # Return -1 to indicate an error
        return -1

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        url = sys.argv[1]  # Get URL passed from Node.js
        result = predict_url(url)
        print(result)  # Output the result (1 for Phishing, 0 for Benign, -1 for Error)
    else:
        print("-1")  # Return -1 to indicate missing URL
