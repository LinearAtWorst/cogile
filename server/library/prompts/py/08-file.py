import os 
import sys

file = os.path.basename(__file__)
f = open(file, 'r')

for line in f:
    sys.stdout.write(line)
