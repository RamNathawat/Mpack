from PIL import Image, ImageFilter
import sys
import numpy as np

def create_smooth_border(image_path, out_path, radius):
    img = Image.open(image_path).convert("RGBA")
    data = np.array(img)
    
    # We want to identify the "core" of the sticker.
    # The sticker consists of the pastel blob (#6AE6D9) and the dark blue line art.
    # Let's just say any pixel that is NOT white (or close to white) is the core.
    
    r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
    
    # Core mask: pixels that are not close to white and have alpha > 0
    # Let's say brightness (R+G+B) < 700 is non-white.
    brightness = r.astype(int) + g.astype(int) + b.astype(int)
    core_mask = (brightness < 720) & (a > 50)
    
    # Create an image from this core mask
    core_img = Image.fromarray((core_mask * 255).astype(np.uint8), mode='L')
    
    # To dilate circularly, we use Gaussian Blur. 
    # A blur with radius R will spread the white pixels outward.
    blurred = core_img.filter(ImageFilter.GaussianBlur(radius=radius))
    
    # Threshold the blurred image to get a hard, smooth expanded edge
    # The lower the threshold, the further out the edge.
    blurred_data = np.array(blurred)
    expanded_mask = (blurred_data > 5).astype(np.uint8) * 255
    
    # Smooth the final edge to anti-alias it
    final_mask_img = Image.fromarray(expanded_mask, mode='L')
    final_mask_img = final_mask_img.filter(ImageFilter.GaussianBlur(radius=1))
    
    # Create the final image:
    # 1. Start with completely transparent
    result = np.zeros_like(data)
    
    # 2. Add the white border using the final_mask
    final_mask_arr = np.array(final_mask_img)
    result[:,:,0] = 255 # R
    result[:,:,1] = 255 # G
    result[:,:,2] = 255 # B
    result[:,:,3] = final_mask_arr # A
    
    # 3. Paste the original core pixels over the white border
    # We only paste the core where core_mask is true
    for c in range(4):
        result[:,:,c] = np.where(core_mask, data[:,:,c], result[:,:,c])
        
    final_img = Image.fromarray(result, mode='RGBA')
    final_img.save(out_path)
    print(f"Saved smooth border to {out_path}")

if __name__ == "__main__":
    create_smooth_border(sys.argv[1], sys.argv[2], int(sys.argv[3]))
