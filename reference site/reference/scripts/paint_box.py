from PIL import Image, ImageFilter, ImageDraw
import sys

def paint_box(input_path, output_path):
    # Open the generated image that has ghost text
    img = Image.open(input_path).convert("RGBA")
    w, h = img.size
    
    # Create a copy of the image to blur
    blurred = img.copy()
    # Apply a huge gaussian blur to erase the text
    blurred = blurred.filter(ImageFilter.GaussianBlur(radius=50))
    
    # Create a mask for the center area where the text is
    # We want a soft mask so it blends perfectly
    mask = Image.new("L", (w, h), 0)
    draw = ImageDraw.Draw(mask)
    
    # The text is on the front face, roughly in the center
    # Draw a rectangle in the center
    draw.rectangle([250, 300, 850, 750], fill=255)
    
    # Blur the mask so the transition is seamless
    mask = mask.filter(ImageFilter.GaussianBlur(radius=80))
    
    # Composite the heavily blurred image over the original image using the mask
    # This replaces the text area with a perfectly smooth gradient!
    img = Image.composite(blurred, img, mask)
    
    # Re-apply the alpha channel from the original image just in case
    # to make sure edges are pristine (though the mask is in the center so edges shouldn't be affected)
    orig = Image.open("public/assets/images/vibe_box.png").convert("RGBA")
    if orig.size != img.size:
        orig = orig.resize(img.size, Image.Resampling.LANCZOS)
        
    orig_data = orig.getdata()
    img_data = img.getdata()
    
    new_data = []
    for o, i in zip(orig_data, img_data):
        new_data.append((i[0], i[1], i[2], o[3]))
        
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print("Success! Box text painted over.")

if __name__ == "__main__":
    paint_box(sys.argv[1], sys.argv[2])
