export async function fetchPost(url, data) {
  return fetch(`https://cors-anywhere.herokuapp.com/${url}`, {
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(err => {
      console.log(err);
    });
}
