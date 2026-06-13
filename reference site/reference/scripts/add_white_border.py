from PIL import Image, ImageFilter
import sys

def add_border(image_path, radius):
    img = Image.open(image_path).convert("RGBA")
    
    # Extract alpha channel
    alpha = img.split()[3]
    
    # Create a mask of the non-transparent pixels
    # We apply a max filter (dilation) to expand the alpha channel
    mask = alpha.filter(ImageFilter.MaxFilter(size=radius * 2 + 1))
    
    # Smooth the mask slightly so the border isn't jaggy
    mask = mask.filter(ImageFilter.GaussianBlur(radius=2))
    
    # Threshold the mask to make it solid again after blur
    mask = mask.point(lambda p: 255 if p > 50 else 0)
    
    # Create a solid white image of the same size
    white_bg = Image.new("RGBA", img.size, (255, 255, 255, 255))
    
    # Apply the expanded mask to the white background
    white_bg.putalpha(mask)
    
    # Paste the original image over the expanded white background
    white_bg.alpha_composite(img)
    
    # Save the result
    white_bg.save(image_path)
    print(f"Added white border of radius {radius} to {image_path}")

if __name__ == "__main__":
    add_border(sys.argv[1], int(sys.argv[2]))
