import sys
from PIL import Image

def analyze_image(path):
    print(f"Analyzing {path}")
    img = Image.open(path).convert("RGBA")
    width, height = img.size
    data = img.getdata()
    
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
            
    if rows_with_pixels:
        print(f"Pixels found from row {rows_with_pixels[0]} to {rows_with_pixels[-1]}")
        # find gaps
        gaps = []
        for i in range(1, len(rows_with_pixels)):
            if rows_with_pixels[i] - rows_with_pixels[i-1] > 5:
                gaps.append((rows_with_pixels[i-1], rows_with_pixels[i]))
        print("Gaps found:", gaps)
    else:
        print("No pixels found")

analyze_image('public/assets/images/vibe_pouch.png')
analyze_image('public/assets/images/mockup_canister.png')
