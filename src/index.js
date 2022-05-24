let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const endpoint = 'http://localhost:3000/toys'
  fetchToys(endpoint) //Fetch all toys from the API and display then on the page

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });


  document.querySelector('.add-toy-form').addEventListener('submit', event => {
    addNewToy(endpoint);
    event.preventDefault();
    document.querySelector('.add-toy-form').reset();
  });

  function fetchToys(endpoint) {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        data.forEach(toy => createToyCard(toy))
      })
      .catch(error => console.log(error))
  }
  
  function addNewToy(endpoint) {
    const POST = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": `${event.target[0].value}`,
        "image": `${event.target[1].value}`,
        "likes": 0
      })
    };
    fetch(endpoint, POST)
      .then(res => res.json())
      .then(toy => createToyCard(toy))
      .catch(error => console.log(error))
  };
  
  function createToyCard(toy) {
    const div = document.createElement('div');
          div.setAttribute('class', 'card')
    const h2 = document.createElement('h2');
    const img = document.createElement('img')
          img.setAttribute('class', 'toy-avatar');
    const p = document.createElement('p');
    const likeButton = document.createElement('button');
          likeButton.setAttribute('class', 'like-btn');
          likeButton.setAttribute('id', `${toy.id}`);
          likeButton.textContent = 'Like'
  
          h2.textContent = toy.name;
          img.src = toy.image;
          p.textContent = `${toy.likes} likes`
          
          div.append(h2, img, p, likeButton);
  
          document.querySelector('#toy-collection').appendChild(div);
  
          document.getElementById(`${toy.id}`).addEventListener('click', event => {
            updateLikes()
          })
  }
  
  function updateLikes() {
    let id = event.target.id;
    let currentLikes = event.target.parentNode.childNodes[2].textContent.split(' ')[0]
    let newLikes = Number(currentLikes) + 1
    const PATCH = {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": newLikes
      })
    };

    fetch(`${endpoint}/${id}`, PATCH)
      .then(res => res.json())
      .then(toy => {
        document.getElementById(`${id}`).parentNode.childNodes[2].textContent = `${toy.likes} likes`
      })
  };
});

