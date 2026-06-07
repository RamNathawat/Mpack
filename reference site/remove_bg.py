from PIL import Image

def make_transparent(image_path):
    img = Image.open(image_path).convert("RGBA")
    data = img.getdata()
    
    # We want to replace the white background with transparent.
    # To avoid removing white inside the sticker, we do a flood fill from the top-left corner.
    
    # We can use ImageDraw.floodfill, but PIL's floodfill doesn't support alpha well directly on the image sometimes.
    # Better: create a mask.
    from PIL import ImageDraw
    
    # Convert to RGB to do flood fill (to avoid alpha issues)
    img_rgb = img.convert("RGB")
    ImageDraw.floodfill(img_rgb, (0, 0), (255, 0, 255), thresh=10)
    ImageDraw.floodfill(img_rgb, (img.width-1, 0), (255, 0, 255), thresh=10)
    ImageDraw.floodfill(img_rgb, (0, img.height-1), (255, 0, 255), thresh=10)
    ImageDraw.floodfill(img_rgb, (img.width-1, img.height-1), (255, 0, 255), thresh=10)
    
    new_data = []
    rgb_data = img_rgb.getdata()
    orig_data = img.getdata()
    for i in range(len(rgb_data)):
        if rgb_data[i] == (255, 0, 255):
            new_data.append((255, 255, 255, 0)) # transparent
        else:
            new_data.append(orig_data[i])
            
    img.putdata(new_data)
    img.save(image_path)
    print(f"Processed {image_path}")

import sys
for arg in sys.argv[1:]:
    make_transparent(arg)
