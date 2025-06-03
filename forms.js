

function toggleIcon() {
    const inputPassword = document.querySelector('#password');
    const eyeVisible = document.getElementById('eye-visible');

    const showPass = inputPassword.type === 'text';

    inputPassword.type = showPass ? 'password' : 'text';
    eyeVisible.src = showPass ? 'assets/icons8-invisível-30.png' : 'assets/icons8-visível-24.png'
}

const form = document.getElementById('form-register');
const msg = document.getElementById('msg');
const load = document.querySelector('.load');




form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.name.value;
    const email = form.email.value;
    const birthdate = form.birthdate.value;
    const cpf = form.cpf.value;
    const password = form.password.value;

    load.style.display = 'block';

    try {
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                name, email, birthdate, cpf,  password
            })
        });

        const data = response.json();

        if (response.ok) {

            sessionStorage.setItem('registered', 'true');
            window.location.href = 'home.html';
            
        } 
        else {
            console.log('erro ao criar', data);
            load.style.backgroundColor = 'red';
            msg.textContent = 'Email já cadastrado';
        }


    } catch (err) {
        console.error(err);
        load.display.style = 'none';
    }
})



