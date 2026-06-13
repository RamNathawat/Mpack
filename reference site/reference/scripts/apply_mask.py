from PIL import Image
import sys

def apply_mask(original_path, generated_path, output_path):
    try:
        orig = Image.open(original_path).convert("RGBA")
        gen = Image.open(generated_path).convert("RGBA")
        
        if orig.size != gen.size:
            print(f"Resizing {generated_path} to {orig.size}")
            gen = gen.resize(orig.size, Image.Resampling.LANCZOS)
            
        orig_data = orig.getdata()
        gen_data = gen.getdata()
        
        new_data = []
        for o, g in zip(orig_data, gen_data):
            new_data.append((g[0], g[1], g[2], o[3]))
            
        gen.putdata(new_data)
        gen.save(output_path, "PNG")
        print(f"Success for {output_path}")
    except Exception as e:
        print(f"Error processing {generated_path}: {e}")

if __name__ == "__main__":
    apply_mask(sys.argv[1], sys.argv[2], sys.argv[3])
