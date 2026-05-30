import sys
from PIL import Image

def remove_background(input_path, output_path, tolerance=15):
    try:
        img = Image.open(input_path).convert("RGBA")
        data = img.getdata()
        
        # Get background color from top-left corner
        bg_color = data[0]
        
        new_data = []
        for item in data:
            # Check if pixel is within tolerance of bg_color
            if (abs(item[0] - bg_color[0]) <= tolerance and
                abs(item[1] - bg_color[1]) <= tolerance and
                abs(item[2] - bg_color[2]) <= tolerance):
                new_data.append((255, 255, 255, 0)) # transparent
            else:
                new_data.append(item)
                
        img.putdata(new_data)
        img.save(output_path, "PNG")
        print("Success")
    except Exception as e:
        print("Error:", e)

remove_background('public/assets/images/logo-mpack.jpeg', 'public/assets/images/logo-mpack.png')
