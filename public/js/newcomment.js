
  document
    .querySelector('#newButton')
    .addEventListener('click', function(event){
      event.preventDefault();
    
      const comment = document.querySelector('#comment-desc').value.trim();
      
    
      if (comment) {
        const response = fetch(`api/blogs/`, {
          method: 'POST',
          body: JSON.stringify({ comment }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        // console.log(response)
    
        if (response.ok) {
          document.location.replace('/');
        } else {
          alert('Failed to create a new comment');
        }
      }
    });