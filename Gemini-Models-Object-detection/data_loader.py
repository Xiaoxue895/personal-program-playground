
import gdown
import zipfile
import os

def download_and_extract_data(url, dest_folder):
    output_path = os.path.join(dest_folder, "object_dataset.zip")
    gdown.download(url, output_path, quiet=False)
    
    with zipfile.ZipFile(output_path, 'r') as zip_ref:
        zip_ref.extractall(dest_folder)
    
    os.remove(output_path)
    print("Dataset extracted and ready for use.")

if __name__ == "__main__":
    url = 'https://drive.google.com/uc?id=1Mafi6V95rRUaVN49WVXfJo5aouwYRagf'
    download_and_extract_data(url, './object_dataset')
