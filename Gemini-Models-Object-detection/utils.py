from PIL import ImageDraw, ImageFont

def draw_bounding_boxes(image, bounding_boxes, labels, colors):
    draw = ImageDraw.Draw(image)
    for box in bounding_boxes:
        y_min, x_min, y_max, x_max = box.box_2d
        color = colors[labels.index(box.label) % len(colors)]
        draw.rectangle([(x_min, y_min), (x_max, y_max)], outline=color, width=4)
        
        text = box.label
        bbox = draw.textbbox((0, 0), text, font=ImageFont.load_default())
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        padding = 3

        bg_x0 = x_min + 4
        bg_y0 = y_min
        bg_x1 = bg_x0 + text_width + 2 * padding
        bg_y1 = bg_y0 + text_height + 2 * padding

        draw.rectangle([(bg_x0, bg_y0), (bg_x1, bg_y1)], fill=color)
        draw.text((bg_x0 + padding, bg_y0 + padding), text, fill="black", font=ImageFont.load_default())
