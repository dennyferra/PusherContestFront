export default function parseResponse(response) {
  return new Promise((resolve, reject) => {
    const data = {
      ok: response.ok,
      status: response.status,
      response
    }

    if (response.ok || response.status === 400) {
      response.json().then(json =>
        resolve({
          ...data,
          json
        })
      )
    } else {
      resolve(data)
    }
  })
}
