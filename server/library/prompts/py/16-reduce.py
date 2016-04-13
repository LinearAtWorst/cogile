import functools

f = lambda x, y: x + y
a = range(10)
sum = functools.reduce(f, a)
print(sum)