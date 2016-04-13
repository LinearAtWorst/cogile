def insertion_sort(a):
    for j in range(1, len(a)):
        k = a[j]
        i = j - 1
        while (i >= 0) and (a[i] > k):
            a[i+1] = a[i]
            i = i - 1
        a[i+1] = k

nums = [3, 5, 1, 4, 2, 0]
insertion_sort(nums)
print(nums)
