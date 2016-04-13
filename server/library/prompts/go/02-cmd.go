func cmd() {
	out, err := exec.Command("ls").Output()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%s", out)
}
