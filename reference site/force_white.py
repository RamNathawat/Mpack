from PIL import Image, ImageDraw
import sys

def force_white(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    draw = ImageDraw.Draw(img)
    
    # The text is roughly in the center of the box front face
    # Draw a solid white rectangle over it
    # Coordinates for the front face text
    draw.rectangle([250, 250, 850, 800], fill=(255, 255, 255, 255))
    
    img.save(output_path, "PNG")
    print("Success")

if __name__ == "__main__":
    force_white(sys.argv[1], sys.argv[2])
