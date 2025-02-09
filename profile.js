
function getUserId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('user');
}

/
async function fetchUserData(userId) {
    try {
        const response = await fetch('data.json');
        if (response.ok) {
            const data = await response.json();
            return data[userId]; 
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}


window.onload = function () {
    const userId = getUserId();
    fetchUserData(userId).then(userData => {
        
        if (userData) {
            document.getElementById('user-name').textContent = userData.name;
            document.getElementById('user-bio').textContent = userData.bio;
            document.getElementById('profile-pic').src = userData.profilePic;
            
          
            const postsContainer = document.getElementById('user-posts');
            userData.posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.textContent = post;
                postsContainer.appendChild(postElement);
            });
        } else {
            document.getElementById('profile-info').innerHTML = "<p>User not found!</p>";
        }
    });
};
