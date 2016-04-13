type Pt struct {
	x, y float64
}
func dist(p1 Pt, p2 Pt) float64 {
	a := p1.x - p2.x
	b := p1.y - p2.y
	return math.Sqrt(a*a + b*b)
}
func main() {
	p1 := Pt{0, 3}
	p2 := Pt{4, 0}
	fmt.Println(dist(p1, p2))
}