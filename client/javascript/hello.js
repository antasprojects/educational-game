document.addEventListener('DOMContentLoaded', async () => {


    

    const options = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      
    try {
        const response = await fetch("http://localhost:3000/hello", options);

        if (response.ok) {
        } else {
            window.location.href = '/index.html';
        }
    } catch (error) {
        console.error('Error:', error);
        window.location.href = '/index.html';
    }
});