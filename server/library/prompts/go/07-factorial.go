func fact(n int) int {
	if n == 1 {
		return 1
	} else {
		return n * fact(n-1)
	}
}

func main() {
	fmt.Println(fact(5))
}
