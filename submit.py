import hmac
import hashlib
import time
import base64
import json
import requests
import struct

# Your information
email = "jhadekartik@gmail.com"
gist_url = "https://gist.github.com/jhadekartik/48e3fb23de713682a993840febd3d819"

# Create JSON payload
payload = {
    "github_url": gist_url,
    "contact_email": email,
    "solution_language": "python"
}

# Generate TOTP
def generate_totp(secret, digits=10, period=30):
    # Get current time
    counter = int(time.time()) // period
    
    # Convert counter to bytes
    counter_bytes = struct.pack(">Q", counter)
    
    # Create HMAC-SHA-512
    secret_bytes = secret.encode('utf-8')
    h = hmac.new(secret_bytes, counter_bytes, hashlib.sha512).digest()
    
    # Dynamic truncation
    offset = h[-1] & 0x0F
    binary = ((h[offset] & 0x7F) << 24) | ((h[offset + 1] & 0xFF) << 16) | ((h[offset + 2] & 0xFF) << 8) | (h[offset + 3] & 0xFF)
    
    # Generate TOTP value
    otp = binary % (10 ** digits)
    return str(otp).zfill(digits)

# Generate shared secret
shared_secret = email + "HENNGECHALLENGE004"

# Generate TOTP password
totp_password = generate_totp(shared_secret)

print(f"Generated TOTP: {totp_password}")

# Create Basic Auth
auth = (email, totp_password)

# Make HTTP POST request
url = "https://api.challenge.hennge.com/challenges/backend-recursion/004"
headers = {"Content-Type": "application/json"}

response = requests.post(url, data=json.dumps(payload), headers=headers, auth=auth)

print(f"Status Code: {response.status_code}")
print(f"Response: {response.text}")