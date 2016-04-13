def sync_consume(): 
    while True: 
        print(q.get())
        q.task_done() 

def sync_produce(): 
    consumer = Thread(target=sync_consume, daemon=True)
    consumer.start()
    for i in range(10):
        q.put(i)
        q.join() 

sync_produce()