from pathlib import Path


contents = "I like programming.\n"
contents += "I love creating new games.\n"
contents += "I also like working with data.\n"

path = Path('programming.txt')
path.write_text(contents)
