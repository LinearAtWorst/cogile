def calculate_tip(cost):
    cost *= 1.15
    print('With tip: %f' % cost)
    return cost

meal_cost = 50
meal_with_tip = calculate_tip(meal_cost)