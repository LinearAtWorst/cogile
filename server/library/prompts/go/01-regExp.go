func rx() {
	r := regexp.MustCompile("b(.*?)p")
	fmt.Println(r.ReplaceAllString("beep boop", "f${1}d"))
}
