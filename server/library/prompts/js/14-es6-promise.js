new Promise((resolve, reject) =>
  reject(new Error('Failed to fulfill Promise')))
    .catch(reason => console.log(reason));