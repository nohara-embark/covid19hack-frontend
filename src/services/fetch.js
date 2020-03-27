export async function fetchPost(url, data) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(response => {
      return response.status;
    })
    .catch(err => {
      console.log(err);
    });
}
