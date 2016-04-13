func bigfib() {
	a := big.NewInt(0)
	b := big.NewInt(1)

	var limit big.Int
	limit.Exp(big.NewInt(10), big.NewInt(99), nil)

	for a.Cmp(&limit) < 0 {
		a.Add(a, b)
		a, b = b, a
	}
	fmt.Println(a)
}