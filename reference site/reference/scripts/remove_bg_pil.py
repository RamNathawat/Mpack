from PIL import Image
import sys

def remove_background(input_path, output_path, tolerance=30):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    
    # Get top-left pixel as background color
    bg_color = datas[0]
    
    newData = []
    for item in datas:
        # Check if color is within tolerance
        if (abs(item[0] - bg_color[0]) <= tolerance and
            abs(item[1] - bg_color[1]) <= tolerance and
            abs(item[2] - bg_color[2]) <= tolerance):
            newData.append((255, 255, 255, 0)) # Transparent
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(output_path, "PNG")
    print(f"Saved {output_path}")

remove_background("public/assets/images/new_origins_box.png", "public/assets/images/new_origins_box_nobg.png")
