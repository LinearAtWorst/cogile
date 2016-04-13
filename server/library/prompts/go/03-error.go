func main() {
	i, err := strconv.Atoi("42A")
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("int", i)
}
