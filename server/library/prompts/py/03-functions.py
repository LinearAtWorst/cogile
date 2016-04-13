def calculate_tip(cost):
    cost *= 1.15
    print "With tip: %f" % cost
    return cost

meal_cost = 50
meal_with_tip = tax(meal_cost)