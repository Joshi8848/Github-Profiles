const search = document.getElementById("search");
const form = document.querySelector(".search-bar");
const displayBody = document.querySelector(".container");
const GitHubAPI = "https://api.github.com/users/";

async function getUserData(username) {
  const userInfo = await fetch(GitHubAPI + username);
  const profile = await userInfo.json();
  console.log(profile);

  displayUserData(profile);

  getRepos(username);
}

async function getRepos(username) {
  const userInfo = await fetch(GitHubAPI + username + "/repos");
  const profile = await userInfo.json();

  addRepos(profile);
}

function displayUserData(data) {
  const {
    avatar_url,
    name,
    company,
    bio,
    followers,
    following,
    public_repos,
    login,
  } = data;
  const html = ` 
  <div class="profile-container">
  <div class="img-container">
    <img
      src="${avatar_url}"
      alt="Github profile with the username${login}"
    />
  </div>
  <div class="text-container">
    <h2>${name}</h2>
    <h4>${company ? company : "No company"}</h4>
    <p>${bio ? bio : "No bio"}</p>
    <ul class="icon-container">
      <li><span class="user-info">${followers}</span>Followers</li>
      <li><span class="user-info">${following}</span>Following</li>
      <li><span class="user-info">${public_repos}</span>Repos</li>
    </ul>
    <ul class="repos" id="repos"></ul>
  </div>
  
</div>

`;
  displayBody.insertAdjacentHTML("beforeend", html);
}

function addRepos(repos) {
  const reposEl = document.getElementById("repos");
  console.log(repos);

  repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10)
    .forEach((repo) => {
      const li = document.createElement("li");
      const anchor = document.createElement("a");
      const name = repo.name;
      const url = repo.html_url;
      anchor.setAttribute("href", url);
      anchor.setAttribute("target", "_blank");
      anchor.innerHTML = name;
      li.append(anchor);
      li.classList.add("repo");
      reposEl.appendChild(li);
    });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const inputValue = search.value;
  if (!inputValue) return;
  search.value = "";
  search.focus();
  displayBody.innerHTML = "";
  getUserData(inputValue);
});
