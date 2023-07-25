const getSuspender = (promise) => {
  let status = "pending"
  let response

  const suspender = promise.then(
    (res) => {
      status = "success"
      response = res
    },
    (err) => {
      status = "error"
      response = err
    }
  )

  const read = () => {
    switch (status) {
      case "pending":
        throw suspender
      case "error":
        throw response
      default:
        return response
    }
  }

  return { read }
}

export function fetchData(url, token) {
  const promise = fetch(url, {headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }})
    .then((response) => response.json())
    .then((json) => json)

  return getSuspender(promise)
}