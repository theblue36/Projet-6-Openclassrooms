const form = document.querySelector("form")
console.log(form)
form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    try {
        const response =  await fetch("http://localhost:5678/api/users/login", {
            method:"POST",
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        
            headers: {'Content-Type': 'application/json'},
        
           }) 
           if (response.ok){
            const data = await response.json()
            localStorage.setItem('accessToken', data.token);
            window.location.href = "../index.html"
        
           }
    } catch(error) {
        console.log(error)
    }
} )