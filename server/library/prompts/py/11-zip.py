import string
nums = range(1,27)
letters = string.ascii_lowercase

for n, a in zip(nums, letters):
    print(n, '=>', a)
