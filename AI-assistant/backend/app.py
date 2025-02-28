from flask import Flask
from flask_cors import CORS
from ai_routes import ai_routes

app = Flask(__name__)
CORS(app)  


app.register_blueprint(ai_routes, url_prefix="/")

if __name__ == "__main__":
    app.run(debug=True)
