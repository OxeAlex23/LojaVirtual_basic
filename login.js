function toggleIcon() {
    const inputPassword = document.querySelector('#loginPassword');
    const eyeVisible = document.getElementById('eye-visible');

    const showPass = inputPassword.type === 'text';

    inputPassword.type = showPass ? 'password' : 'text';
    eyeVisible.src = showPass ? 'assets/icons8-invisível-30.png' : 'assets/icons8-visível-24.png'
}

//login
const formLogin = document.getElementById('loginForm');

formLogin.addEventListener('submit', async (a) => {
    a.preventDefault();

    const email = formLogin.email.value;
    const password = formLogin.password.value;

    try {
        const response = await fetch('http://localhost:3000/auth/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })

        });

        const data = await response.json();

        if (response.ok) {
            const token = data.token
            const userId = data.userId
            console.log('logado')

            sessionStorage.setItem('logged', 'true');
            localStorage.setItem('userId', userId);
            localStorage.setItem('token', token);
            window.location.href = 'home.html';

        } else {
            console.error(data.msg);
            console.log('nao logado');
        }
    } catch (err) {
        console.error('Erro na requisição:', err);
    }
});


