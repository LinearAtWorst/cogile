func f(i interface{}) {
	switch v := i.(type) {
	case string:
		fmt.Printf("%q is string\n", v)
	default:
		fmt.Printf("%v is %T\n", v, v)
	}
}

func main() {
	f(true)
}