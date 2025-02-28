from flask import Blueprint, request, jsonify
from openai import OpenAI
import os

ai_routes = Blueprint('ai', __name__)

client = OpenAI(
  api_key="sad"
)

@ai_routes.route("/")
def test():
    return "backend is ok"

@ai_routes.route('/recommendations', methods=['POST'])
def get_travel_recommendations():
    try:
        data = request.json
        user_query = data.get('query', '')

        completion = client.chat.completions.create(
            model="gpt-4o-mini", 
            messages=[
                {"role": "user", "content": user_query}
            ]
        )
        reply = completion.choices[0].message['content']
        return jsonify({"reply": reply}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500



