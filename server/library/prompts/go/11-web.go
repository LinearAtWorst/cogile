func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, r.URL.Path)
	})
	http.ListenAndServe(":8080", nil)
}
