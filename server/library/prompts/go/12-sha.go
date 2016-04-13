func main() {
	sha()
}

func sha() {
	hash := sha512.New()
	io.WriteString(hash, "cleartext")
	encrypted := hash.Sum(nil)
	fmt.Printf("%x\n", encrypted)
}