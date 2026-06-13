from PIL import Image
import sys

def change_color(image_path, target_color_hex):
    # Convert hex to RGB
    target_color_hex = target_color_hex.lstrip('#')
    tr, tg, tb = tuple(int(target_color_hex[i:i+2], 16) for i in (0, 2, 4))
    
    img = Image.open(image_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    # The electric blue is roughly (0, 115, 255) but let's check for "mostly blue"
    # Or we can just find the most common non-white, non-transparent, non-dark blue pixel
    
    # Let's sample the blob color. It's the brightest blue in the image.
    # We'll just replace any pixel that is primarily blue (b > r + 50 and b > g + 50) and bright
    # Actually, we can be more specific. The DALL-E electric blue is usually solid.
    
    # Find the blob color by finding a pixel that has high blue, low red.
    blob_color = None
    for r, g, b, a in data:
        if a > 100 and b > 200 and r < 100 and g < 150:
            blob_color = (r, g, b)
            break
            
    if not blob_color:
        print("Could not find blue blob color")
        return
        
    print(f"Detected blob color: {blob_color}")
    
    for r, g, b, a in data:
        # Distance to blob color
        dist = ((r - blob_color[0])**2 + (g - blob_color[1])**2 + (b - blob_color[2])**2)**0.5
        if dist < 80 and a > 0:
            # Replace with target color, preserve alpha
            new_data.append((tr, tg, tb, a))
        else:
            new_data.append((r, g, b, a))
            
    img.putdata(new_data)
    img.save(image_path)
    print(f"Saved {image_path}")

change_color(sys.argv[1], sys.argv[2])
