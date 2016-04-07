for num in xrange(1,101):
    if num % 5 == 0 and num % 3 == 0:
        msg = "FizzBuzz"
    elif num % 3 == 0:
        msg = "Fizz"
    elif num % 5 == 0:
        msg = "Buzz"
    else:
        msg = str(num)
    print msg