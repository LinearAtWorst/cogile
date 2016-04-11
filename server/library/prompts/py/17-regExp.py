import re

text = 'beep boop';
a = r'b(.*?)p'
b = r'f\1d'
c = re.sub(a,b,text)
print(c)
