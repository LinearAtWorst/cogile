type Person struct {
	Last  string
	First string
}

func main() {
	p := Person{"Turing", "Alan"}
	a, _ := json.Marshal(p)
	os.Stdout.Write(a)
}
