from PIL import Image

def remove_white_border(image_path):
    img = Image.open(image_path).convert("RGBA")
    data = img.load()
    width, height = img.size
    
    # Find all white pixels that are adjacent to a transparent pixel
    # and flood fill them with transparent
    
    # We will use BFS
    from collections import deque
    queue = deque()
    
    # Find all transparent pixels
    for y in range(height):
        for x in range(width):
            if data[x, y][3] == 0:
                queue.append((x, y))
                
    visited = set(queue)
    
    # We define "white" as something close to (255, 255, 255)
    def is_white(rgba):
        return rgba[0] > 240 and rgba[1] > 240 and rgba[2] > 240 and rgba[3] > 0
        
    while queue:
        x, y = queue.popleft()
        
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1), (-1, -1), (-1, 1), (1, -1), (1, 1)]:
            nx, ny = x + dx, y + dy
            if 0 <= nx < width and 0 <= ny < height:
                if (nx, ny) not in visited:
                    if is_white(data[nx, ny]):
                        data[nx, ny] = (255, 255, 255, 0)
                        queue.append((nx, ny))
                        visited.add((nx, ny))

    img.save(image_path)
    print(f"Removed white border from {image_path}")

import sys
for arg in sys.argv[1:]:
    remove_white_border(arg)
