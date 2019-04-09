let URL = 'https://api.github.com/search/users?q='
const gitForm = document.getElementById('github-form')
const userListUl = document.getElementById('user-list')
const repoUl = document.getElementById('repos-list')
function fetchName(name) {
  fetch(URL+name)
    .then(res => res.json())
    .then(json => {
      displayUsers(json)
    })
}

gitForm.addEventListener('submit', (ev) => {
  ev.preventDefault()
  let userName = document.getElementById('search').value
  fetchName(userName)
});

function displayUsers(json) {
  clearContainer(userListUl)
  clearContainer(repoUl)
  json.items.forEach(item => {
    let li = document.createElement('li')
    let img = document.createElement('img')
    li.textContent = item.login
    img.src = item.avatar_url
    li.appendChild(img)
    userListUl.appendChild(li)
    img.addEventListener('click', (ev) => {
      fetchUserRepos(item.login)
    })
  })
}

function fetchUserRepos(name) {
  fetch(`https://api.github.com/users/${name}/repos`)
    .then(res => res.json())
    .then(json => displayUserRepos(json))
}

function displayUserRepos(repos) {
  clearContainer(repoUl)
  repos.forEach(repo => {
    let repoName = repo.name
    let li = document.createElement('li')
    li.textContent = repoName
    repoUl.appendChild(li)
  })
}

function clearContainer(someContainer){
  while (someContainer.firstChild){
    someContainer.firstChild.remove()
  }
}
