
import requests
from io import BytesIO
from PIL import Image, ImageDraw, ImageFont
from pydantic import BaseModel
from google import genai
from config import GOOGLE_API_KEY
import os

client = genai.Client(api_key=GOOGLE_API_KEY)

class BoundingBox(BaseModel):
    box_2d: list[int]  
    label: str         

def process_image_with_prompt(prompt: str, image: Image.Image):
    response = client.models.generate_content(
        # model="gemini-2.5-pro-exp-03-25", 
        model="gemini-1.5-pro-latest", 
        # model="gemini-pro",
        contents=[prompt, image],
        config={
            'response_mime_type': 'application/json',
            'response_schema': list[BoundingBox],
        },
    )

    bounding_boxes = response.parsed
    print("Detected bounding boxes:", bounding_boxes)

    img = image.copy()
    width, height = img.size
    draw = ImageDraw.Draw(img)
    
    labels = list(set(box.label for box in bounding_boxes))
    colors = ['lightblue', 'lightcoral', 'lightgreen', 'lightyellow', 'lightsalmon', 'lightpink', 'lavender']

    try:
        font_path = "/System/Library/Fonts/Supplemental/Arial.ttf"  
        font = ImageFont.truetype(font_path, size=24)
    except IOError:
        font = ImageFont.load_default()

    for box in bounding_boxes:
        y_min, x_min, y_max, x_max = box.box_2d
        y_min = int(y_min / 1000 * height)
        x_min = int(x_min / 1000 * width)
        y_max = int(y_max / 1000 * height)
        x_max = int(x_max / 1000 * width)

        color = colors[labels.index(box.label) % len(colors)]

        draw.rectangle([(x_min, y_min), (x_max, y_max)], outline=color, width=4)

        text = box.label
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        padding = 3

        bg_x0 = x_min + 4
        bg_y0 = y_min
        bg_x1 = bg_x0 + text_width + 2 * padding
        bg_y1 = bg_y0 + text_height + 2 * padding

        draw.rectangle([(bg_x0, bg_y0), (bg_x1, bg_y1)], fill=color)
        draw.text((bg_x0 + padding, bg_y0 + padding), text, fill="black", font=font)

    img.show()

if __name__ == "__main__":
    image_path = './object_dataset/image (1).jpeg'
    image = Image.open(image_path)
    prompt = "Detect and draw 2D bounding boxes around objects in the image"
    process_image_with_prompt(prompt, image)
