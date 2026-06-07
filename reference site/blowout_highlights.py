from PIL import Image
import sys

def blowout_highlights(input_path, output_path):
    # Open the image
    img = Image.open(input_path).convert("RGBA")
    
    # Split into bands
    r, g, b, a = img.split()
    
    # Multiply RGB values to blow out the light grays into pure white
    # Anything above ~230 will become 255.
    # We use a point operation with a multiplier. Let's multiply by 1.15
    multiplier = 1.15
    
    r = r.point(lambda i: min(255, int(i * multiplier)))
    g = g.point(lambda i: min(255, int(i * multiplier)))
    b = b.point(lambda i: min(255, int(i * multiplier)))
    
    # Merge back
    result = Image.merge("RGBA", (r, g, b, a))
    
    # Save
    result.save(output_path, "PNG")
    print("Success")

if __name__ == "__main__":
    blowout_highlights(sys.argv[1], sys.argv[2])
