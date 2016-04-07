def tax(bill):
    """Adds 8% tax to a restaurant bill."""
    bill *= 1.08
    print "With tax: %f" % bill
    return bill

meal_cost = 100
meal_with_tax = tax(meal_cost)