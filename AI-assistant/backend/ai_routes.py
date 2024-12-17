from flask import Blueprint, request, jsonify
import http.client
import json
import os

ai_routes = Blueprint('ai', __name__)

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

@ai_routes.route('/recommendations', methods=['POST'])
def get_travel_recommendations():
    data = request.json
    user_query = data.get('query', '')

    conn = http.client.HTTPSConnection("api.openai.com")
    headers = {
        'Authorization': f'Bearer {OPENAI_API_KEY}',
        'Content-Type': 'application/json'
    }

    payload = json.dumps({
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": user_query}
        ]
    })

    try:
        conn.request("POST", "/v1/chat/completions", payload, headers)
        response = conn.getresponse()
        data = response.read()
        response_json = json.loads(data.decode("utf-8"))
        return jsonify(response_json), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

