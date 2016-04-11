def sum_digits(n):
    if n < 10:
        return n
    else:
        last = n % 10
        others = n // 10
        return sum_digits(others) + last

print(sum_digits(123))
