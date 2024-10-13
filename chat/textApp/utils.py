import random


def createUrl():
    nums = [0] * 8
    for i in range(8):
        nums[i] = random.randint(1, 9)
    url = ''.join([str(num) for num in nums])
    return url