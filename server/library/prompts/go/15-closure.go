func adder() func(int) int {
	sum := 0
	return func(x int) int {
		sum += x
		return sum
	}
}
func main() {
	a, b := adder(), adder()
	for i := 0; i < 10; i++ {
		fmt.Println(a(i), b(-i))
	}
}