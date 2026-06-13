import math
from PIL import Image

def remove_background_no_halo(input_path, output_path, threshold_dist=120):
    try:
        img = Image.open(input_path).convert("RGBA")
        data = img.getdata()
        
        # We know bg is around (247, 247, 247)
        bg_r, bg_g, bg_b = 247, 247, 247
        
        new_data = []
        for item in data:
            r, g, b, a = item
            
            # Calculate Euclidean distance to background
            dist = math.sqrt((r - bg_r)**2 + (g - bg_g)**2 + (b - bg_b)**2)
            
            if dist < threshold_dist:
                # Transparent
                new_data.append((255, 255, 255, 0))
            else:
                # Keep original pixel
                new_data.append(item)
                
        img.putdata(new_data)
        img.save(output_path, "PNG")
        print("Success")
    except Exception as e:
        print("Error:", e)

remove_background_no_halo('public/assets/images/logo-mpack.jpeg', 'public/assets/images/logo-mpack.png')
