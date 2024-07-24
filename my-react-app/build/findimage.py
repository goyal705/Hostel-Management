import os

def find_image(filename):
    print("filename",filename)
    images_directory = r'static\images'
    files = os.listdir(images_directory)
    for file in files:
        name, ext = os.path.splitext(file)
        
        if name == filename:
            return os.path.join(images_directory, file)
    return None


# print(find_image("3"))
