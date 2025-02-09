
function submitRating(postId) {
    const rating = document.getElementById(`rating-${postId}`).value;
    alert(`You rated this post ${rating} stars!`);
}


function submitComment(postId) {
    const commentBox = document.getElementById(`comment-${postId}`);
    const commentText = commentBox.value.trim();
    const commentSection = document.getElementById(`comments-section-${postId}`);

    if (commentText === "") {
        alert("Please write a comment before posting.");
        return;
    }

  
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");
    commentDiv.innerText = commentText;
    commentSection.appendChild(commentDiv);

    commentBox.value = "";
}

function postComment(postId) {
    const commentText = document.getElementById(`comment-${postId}`).value;
    const commentsSection = document.getElementById(`comments-section-${postId}`);
    if (commentText) {
        const commentElement = document.createElement('p');
        commentElement.textContent = commentText;
        commentsSection.appendChild(commentElement);
        document.getElementById(`comment-${postId}`).value = '';
    }
}

