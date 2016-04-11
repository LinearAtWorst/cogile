def curry2(f):
    def g(x):
        def h(y):
            return f(x, y)
        return h
    return g

curpow = curry2(pow)
two_to_the = curpow(2)
print(two_to_the(5))
print(two_to_the(10))
