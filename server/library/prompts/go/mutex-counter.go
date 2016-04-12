type SafeCounter struct {
	v map[string]int
	m sync.Mutex
}
func (c *SafeCounter) Inc(k string) {
	c.m.Lock()
	c.v[k]++
	c.m.Unlock()
}
func (c *SafeCounter) Val(k string) int {
	c.m.Lock()
	defer c.m.Unlock()
	return c.v[k]
}