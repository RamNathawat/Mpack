from PIL import Image

def analyze(path):
    img = Image.open(path).convert('RGB')
    extrema = img.getextrema()
    print(f"{path}: R={extrema[0]} G={extrema[1]} B={extrema[2]}")

analyze("public/assets/images/competitor_canister.png")
analyze("public/assets/images/mockup_canister_noshadow.png")
