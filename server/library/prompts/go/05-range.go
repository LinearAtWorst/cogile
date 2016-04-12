func main() {
	r()
}

var fibs = []int{0, 1, 1, 2, 3, 5, 8, 13}

func r() {
	for i, val := range fibs {
		fmt.Printf("fib(%d) is %d\n", i, val)
	}
}
