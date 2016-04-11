def adder():
    sum = 0
    def f(x):
        nonlocal sum
        sum = sum + x
        return sum
    return f

a = adder()
b = adder()

for i in range(10):
    print(a(i), b(-2*i))