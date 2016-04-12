func maps() {
	m := map[string]int{
		"a": 1,
		"b": 2,
	}

	delete(m, "a")
	v, hasKey := m["a"]
	fmt.Println(v, hasKey)

	m["b"] = 22
	fmt.Println(m)
}