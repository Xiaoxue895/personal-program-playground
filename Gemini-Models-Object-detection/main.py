
from data_loader import download_and_extract_data
from detection import process_image_with_prompt
from PIL import Image

def main():
    # url = 'https://drive.google.com/uc?id=1Mafi6V95rRUaVN49WVXfJo5aouwYRagf'
    # download_and_extract_data(url, './object_dataset')

    # image_path = './object_dataset/image (1).jpeg'
    image_path = '/Users/xiaoxuewang/Desktop/618.jpg'
    image = Image.open(image_path)

    prompt = "Detect and draw 2D bounding boxes around objects in the image"
    process_image_with_prompt(prompt, image)

if __name__ == "__main__":
    main()
