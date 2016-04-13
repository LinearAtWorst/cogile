func main() {
	l := list.New()
	e := l.PushFront(2)
	l.InsertBefore(1, e)
	l.InsertAfter(3, e)

	for e := l.Front(); e != nil; e = e.Next() {
		fmt.Println(e.Value)
	}
}
