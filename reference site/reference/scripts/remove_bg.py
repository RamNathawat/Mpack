import sys
from PIL import Image

def process_image(in_path, out_path):
    img = Image.open(in_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        r, g, b, a = item
        # If it's a very light pixel (background)
        # Backgrounds generated are typically pure white (255,255,255)
        # Let's make everything > 240 transparent, but gracefully fade the alpha for anti-aliasing
        if r > 230 and g > 230 and b > 230:
            # calculate closeness to white. 255 -> 0 alpha, 230 -> 255 alpha
            min_val = min(r, g, b)
            if min_val == 255:
                alpha = 0
            else:
                alpha = int(max(0, 255 - (min_val - 230) * 10))
            
            # Keep original color but apply transparency
            newData.append((r, g, b, alpha))
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(out_path, "PNG")

if __name__ == "__main__":
    process_image(sys.argv[1], sys.argv[2])
