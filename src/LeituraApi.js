const api = "http://10.0.60.79:3001"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getAllCategories = () =>
fetch(`${api}/categories`, { headers })
.then(res => res.json())
    .then(data => data.categories)

export const getAllPostByCategory = category =>
fetch(`${api}/${category}/posts`, { headers })
.then(res => res.json())
    .then(data => data)

export const getPostById = id =>
fetch(`${api}/posts/${id}`, { headers })
.then(res => res.json())
    .then(data => data)

export const deletePost = (postEntity) =>
fetch(`${api}/posts/${postEntity.id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postEntity)
  }).then(res => res.json())

export const editPost = (postEntity) =>
fetch(`${api}/posts/${postEntity.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postEntity)
  }).then(res => res.json())

export const addPost = (postEntity) =>
fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postEntity)
  }).then(res => res.json())
    .then(data => data)

export const updateScore = (id, option) =>
fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(option)
  }).then(res => res.json())
    .then(data => data)


export const getAllCommentsByPostId = postId =>
fetch(`${api}/posts/${postId}/comments`, { headers })
.then(res => res.json())
    .then(data => data)

export const getCommentById = id =>
fetch(`${api}/comments/${id}`, { headers })
.then(res => res.json())
    .then(data => data)

export const deleteComment = (commentEntity) =>
fetch(`${api}/comments/${commentEntity.id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commentEntity)
  }).then(res => res.json())

export const editComment = (commentEntity) =>
fetch(`${api}/comments/${commentEntity.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commentEntity)
  }).then(res => res.json())

export const addComment = (commentEntity) =>
fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commentEntity)
  }).then(res => res.json())
    .then(data => data)
    
export const updateScoreComment = (id, option) =>
fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(option)
  }).then(res => res.json())
    .then(data => data)
    
