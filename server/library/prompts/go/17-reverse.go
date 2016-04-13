func main() {
	rev()
}

func rev() {
	arr := []int{1, 2, 3, 4, 5}
	i, j := 0, len(arr)-1
	for i < j {
		arr[i], arr[j] = arr[j], arr[i]
		i, j = i+1, j-1
	}
	fmt.Println(arr)
}