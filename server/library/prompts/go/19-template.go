type Person struct {
	Name string
}
func main() {
	p := []Person{
		{Name: "Anna"},
		{Name: "Bob"},
	}
	t := template.Must(template.New("").Parse("Hi {{.Name}}!\n"))
	for _, r := range p {
		t.Execute(os.Stdout, r)
	}
}