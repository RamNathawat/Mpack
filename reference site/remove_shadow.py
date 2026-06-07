from PIL import Image
import sys
import os

def remove_shadow(input_path, output_path):
    print(f"Processing {input_path}...")
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    data = img.getdata()
    
    new_data = []
    
    for y in range(height):
        for x in range(width):
            idx = y * width + x
            r, g, b, a = data[idx]
            
            # The shadow is likely in the bottom half of the image
            # Let's say bottom 30% (y > height * 0.70)
            if y > height * 0.70:
                # If it's mostly white (R,G,B > 220), or if it's very transparent
                # Actually, let's just see if it's a "white-ish" pixel with varying alpha
                if r > 220 and g > 220 and b > 220:
                    new_data.append((255, 255, 255, 0)) # transparent
                else:
                    new_data.append((r, g, b, a))
            else:
                new_data.append((r, g, b, a))
                
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Saved to {output_path}")

if __name__ == "__main__":
    if not os.path.exists('public/assets/images/vibe_pouch_noshadow.png'):
        remove_shadow('public/assets/images/vibe_pouch.png', 'public/assets/images/vibe_pouch_noshadow.png')
    if not os.path.exists('public/assets/images/mockup_canister_noshadow.png'):
        remove_shadow('public/assets/images/mockup_canister.png', 'public/assets/images/mockup_canister_noshadow.png')
