//___________navigation_bar_section___________//

//active links 
let links = document.querySelectorAll('.link');
let sections = document.querySelectorAll('section');
let activeLink = 0;
links.forEach((link, i) => {
    link.addEventListener('click', () => {
        if(activeLink != i){
            links[activeLink].classList.remove('active');
            link.classList.add('active');
            sections[activeLink].classList.remove('active');

            setTimeout(() => {
                activeLink = i;
                sections[i].classList.add('active');
            }, 1000);
        }
    })
})

//__________get advice section__________//

let divAdvice = document.querySelector("#screenAdvice");
let btnAdvice = document.querySelector("#btnAdvice");

btnAdvice.addEventListener("click", ()=>{
  getAdvice();
})

window.onload = () => {
getAdvice();
};

function getAdvice() {
fetch("https://api.adviceslip.com/advice").then(response => {
  return response.json();
}).then(adviceData => {
  let AdviceObject = adviceData.slip;
divAdvice.innerHTML=`<p>${AdviceObject.advice}</p>`;
}).catch(error => {
  console.log(error)
})
}


//___________projects section_____________//

// Fetch the iframes data from the JSON file
fetch('projects.json')
  .then(response => response.json())
  .then(iframesData => {
    // Add the iframes to the page
    let iframesContainer = document.getElementById('iframes-container');
    iframesData.forEach(data => {
      let iframeContainer = createIframeElement(data);
      iframesContainer.appendChild(iframeContainer);
    });
  })
  .catch(error => console.error('Error fetching iframes data:', error));

// Function to create an iframe element with a comment section
function createIframeElement(data) {
  // Create the iframe element
  let iframe = document.createElement('iframe');
  iframe.src = data.videoUrl;
  iframe.title = data.title;
  iframe.allowFullscreen = true; //full screen
 
  // Create the <h2> element
  let heading = document.createElement('h2');
  heading.textContent = data.title;

  // Create the comment section
  let commentsDiv = document.createElement('div');
  commentsDiv.classList.add('comments');

  // Create the input field and button for adding comments
  let commentInput = document.createElement('input');
  commentInput.type = 'text';
  commentInput.placeholder = 'Add a comment...';
  let addCommentButton = document.createElement('button');
  addCommentButton.textContent = 'Add';
  addCommentButton.addEventListener('click', () => {
    let comment = commentInput.value.trim();
    if (comment !== '') {
      addComment(iframe, comment);
      commentInput.value = '';
    }
  });

  // Create the comments list
  let commentsList = document.createElement('ul');
  commentsList.classList.add('comments-list');
  loadComments(iframe, commentsList);

  // Create the button for deleting all comments
  let deleteCommentsButton = document.createElement('button');
  deleteCommentsButton.textContent = 'Delete';
  deleteCommentsButton.addEventListener('click', () => {
    deleteComments(iframe);
    commentsList.innerHTML = '';
  });

  // Add the elements to the comment section
  commentsDiv.appendChild(commentInput);
  commentsDiv.appendChild(addCommentButton);
  commentsDiv.appendChild(commentsList);
  commentsDiv.appendChild(deleteCommentsButton);

  // Create the container element and add the <h2> element, iframe, and comment section to it
  let container = document.createElement('div');
  container.classList.add('iframe-container');
  container.appendChild(heading);
  container.appendChild(iframe);
  container.appendChild(commentsDiv);

  return container;
}

// Function to add a comment to the iframe and save it to local storage
function addComment(iframe, comment) {
  let comments = JSON.parse(localStorage.getItem(iframe.title)) || [];
  comments.push(comment);
  localStorage.setItem(iframe.title, JSON.stringify(comments));
  let commentsList = iframe.parentNode.querySelector('.comments-list');
  let commentItem = document.createElement('li');
  commentItem.textContent = comment;
  commentsList.appendChild(commentItem);
}

// Function to load the comments for the iframe from local storage
function loadComments(iframe, commentsList) {
  let comments = JSON.parse(localStorage.getItem(iframe.title)) || [];
  comments.forEach(comment => {
    let commentItem = document.createElement('li');
    commentItem.textContent = comment;
    commentsList.appendChild(commentItem);
  });
}

// Function to delete all comments for the iframe from local storage
function deleteComments(iframe) {
  localStorage.removeItem(iframe.title);
  
}


//_________Contact_section__________//

//Create the alert with name and message
document.querySelector('.submitBtn').addEventListener('click', event => {
  let fnameInput = document.getElementById('fname');
  let fname = fnameInput.value;
  let promptMessage = ` ${fname} Thank you, we will contact you soon`;
  window.alert(promptMessage);
})


