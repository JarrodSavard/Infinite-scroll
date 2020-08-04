const postContainer = document.getElementById('post__container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

// Fetch posts from API
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();

  return data;
}

// Shows posts to DOM
async function showPosts() {
  const posts = await getPosts();

  posts.forEach((post) => {
    const postEl = document.createElement('div');
    postEl.classList.add('post__post');
    postEl.innerHTML = `
    <div class="post__number">${post.id}</div>
    <div class="post__info">
      <h2 = class="post__title">${post.title}</h2>
      <p class="post__body">${post.body}</p>
    </div>
    `;

    postContainer.appendChild(postEl);
  });
}

// Show Loader & fetch more posts

function showLoading() {
  loading.classList.add('show');

  setTimeout(() => {
    loading.classList.remove('show');

    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}

// Filter Posts by input
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const post = document.querySelectorAll(".post__post");

  post.forEach(post => {
    const title = post.querySelector(".post__title").innerText.toUpperCase();
    const body = post.querySelector(".post__body").innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }

  })
}

// Shows initial posts
showPosts();

// Scroll

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});


// Filter

filter.addEventListener("input", filterPosts);