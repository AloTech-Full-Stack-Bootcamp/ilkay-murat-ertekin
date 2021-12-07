import random


def random_number_generator(n, l=6):
    """
    Example:
    rnd = random_number_generator(15,2)
    for i, v in enumerate(rnd):
        print(f'The value of the {i+1}th number is {v}')
    """
    number_set = set()
    if n > 10**(l-1)*9:
        print(f'There are no {n} numbers with {l} digits')
    else:
        while len(number_set) < n:
            number_set.add(random.randrange(10**(l-1), 10**l))
        for i in random.sample(number_set, n):
            yield i



def my_awesome_decorator(fun):
    def wrapped(*args):
        number_list=[]
        for i in args:
            number_list.append(i+1)
        return not fun(*number_list)
    return wrapped


@my_awesome_decorator
def mod_batch(*numbers):
    return all([True if number % 3 == 0 else False for number in numbers])

