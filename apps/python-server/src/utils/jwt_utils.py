import requests

def validate_jwt_token(token):
    node_api_url = 'http://localhost:3001/api/v1/auth/authenticate'
    
    headers = {'Authorization': f'Bearer {token}'}
    response = requests.post(node_api_url, headers=headers)

    return response.status_code == 200