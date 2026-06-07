import sys
from PIL import Image

def remove_shadow_after_gap(input_path, output_path):
    print(f"Processing {input_path}...")
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    data = list(img.getdata())
    
    rows_with_pixels = []
    
    for y in range(height):
        has_pixel = False
        for x in range(width):
            r, g, b, a = data[y * width + x]
            if a > 10:  # non-transparent
                has_pixel = True
                break
        if has_pixel:
            rows_with_pixels.append(y)
            
    if not rows_with_pixels:
        print("No pixels found")
        return
        
    cutoff_y = height
    for i in range(1, len(rows_with_pixels)):
        if rows_with_pixels[i] - rows_with_pixels[i-1] > 20: # 20px gap
            cutoff_y = rows_with_pixels[i-1] + 1
            print(f"Found gap, cutting off everything after row {cutoff_y}")
            break
            
    new_data = []
    for y in range(height):
        for x in range(width):
            idx = y * width + x
            if y >= cutoff_y:
                new_data.append((255, 255, 255, 0)) # transparent
            else:
                new_data.append(data[idx])
                
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Saved to {output_path}")

if __name__ == "__main__":
    remove_shadow_after_gap('public/assets/images/vibe_pouch.png', 'public/assets/images/vibe_pouch_noshadow.png')
    remove_shadow_after_gap('public/assets/images/mockup_canister.png', 'public/assets/images/mockup_canister_noshadow.png')
