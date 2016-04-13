func sum(s []int, c chan int) {
	a := 0
	for _, val := range s { a += val }
	c <- a
}

func main() {
	s := []int{1, 2, 3, 4, 5}
	c := make(chan int)
	go sum(s, c)
	x := <-c
	fmt.Println(x)
}