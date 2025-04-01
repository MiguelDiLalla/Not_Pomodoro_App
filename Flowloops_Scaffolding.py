from pathlib import Path

# Define base directory (relative to wherever the script is run)
base_dir = Path(__file__).parent

# Define the folder structure and files to create
structure = {
    "src": [
        "App.jsx",
        "main.jsx",
        "components/RunPauseButton.jsx",
        "components/ButtonGrid.jsx",
        "components/NotificationManager.jsx"
    ],
    "public": [
        "index.html",
        "manifest.json",
        "sounds/click.mp3"  # Placeholder, just creates the path
    ],
    "": [  # Root files
        "package.json",
        "vite.config.js",
        "tailwind.config.js",
        "copilot-instructions.md"
    ]
}

# Create folders and files
for folder, files in structure.items():
    dir_path = base_dir / folder
    for file in files:
        file_path = dir_path / file
        file_path.parent.mkdir(parents=True, exist_ok=True)
        file_path.touch()

import os
import pandas as pd

# Generate a DataFrame to visually confirm the file tree
file_list = [str(p.relative_to(base_dir)) for p in base_dir.rglob("*") if p.is_file()]
