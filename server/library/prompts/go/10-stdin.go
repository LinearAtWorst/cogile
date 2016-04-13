func stdin() {
	scanner := bufio.NewScanner(os.Stdin)
	for scanner.Scan() {
		text := scanner.Text()
		if text == "exit" {
			fmt.Println("sayonara!")
			break
		} else {
			fmt.Println(text)
		}
	}
}