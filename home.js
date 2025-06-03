
const btnShow = document.querySelector('#show-Input-Search');
const navBarDown = document.querySelector('.nav-bar-down');

btnShow.addEventListener('click', () => {
  navBarDown.classList.toggle('hidden')
})


// CADASTRADO COM SUCESSO
window.addEventListener('DOMContentLoaded', () => {
  const btnsNav = document.querySelectorAll('.btnsNav');
  const btnProfile = document.getElementById('btn-profile');

  const isRegistered = sessionStorage.getItem('registered') === 'true';
  const isLogged = sessionStorage.getItem('logged') === 'true';

  if (isRegistered || isLogged) {
    btnsNav.forEach(btn => {
      btn.style.display = 'none'
    })

    btnProfile.style.display = 'flex';
  } else {
    console.log('erro no botao')
  }
})

// 2 criar mais produtos no banco
// 3 add um spin no loading

const profileBtn = document.getElementById('btn-profile');
const contentProfile = document.querySelector('.content-profile');


function hideAway(event) {


  if (!contentProfile.contains(event.target) && event.target !== profileBtn) {
    contentProfile.classList.remove('visible');
    document.removeEventListener('click', hideAway);
  }
}

profileBtn.addEventListener('click', function () {

  contentProfile.classList.add('visible');
  showMsg()


  setTimeout(() => {
    document.addEventListener('click', hideAway);
  }, 0);

});


const btnSearch = document.getElementById('icon-search');
const inputSearch = document.getElementById('input-search');

btnSearch.addEventListener('click', () => {
  const divProduct = document.querySelectorAll('.product');

  const textSearch = inputSearch.value.toLowerCase();

  for (let i = 0; i < divProduct.length; i++) {
    const product = divProduct[i];

    const title = product.querySelector('#product-title')?.textContent.toLocaleLowerCase() || '';
    const tags = product.querySelector('#tags')?.textContent.toLocaleLowerCase() || '';
    const category = product.querySelector('.category')?.textContent.toLocaleLowerCase() || '';

    const match = title.includes(textSearch) || tags.includes(textSearch) || category.includes(textSearch);

    product.style.display = match ? '' : 'none';

  }

})

const listBar = document.querySelectorAll('.list-bar');


listBar.forEach(iten => {
  iten.addEventListener('click', () => {
    const divProduct = document.querySelectorAll('.product');

    for (let i = 0; i < divProduct.length; i++) {
      const product = divProduct[i];

      const category = product.querySelector('.category')?.textContent.toLowerCase() || '';

      const match = category.includes(iten.textContent.toLowerCase());

      product.style.display = match ? '' : 'none';

    }
  })
})

async function buscarName() {

  try {


    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:3000/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('erro na requisião' + response.status)
    }

    const dados = await response.json();


    const userName = document.getElementById('span-name');
    const userBirthdate = document.getElementById('birthdate')
    const userCpf = document.getElementById('user-cpf');

    const dateOriginal = dados.birthdate;
    const [year, mouth, day] = dateOriginal.split('-');
    const dateFormated = `${day}/${mouth}/${year}`;

    const cpf = dados.cpf;
    const cpfFormated = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

    userName.textContent = `Nome: ${dados.name}`;
    userBirthdate.textContent = `Data de Nascimento: ${dateFormated}`;
    userCpf.textContent = `CPF: ${cpfFormated}`;

  } catch (err) {
    console.error('erro ao buscar dados' + err)
  }

};



//logout

document.addEventListener('click', function (event) {
  if (event.target && event.target.id === 'btn-logout') {

    const isRegistered = sessionStorage.getItem('registered') === 'true';
    const isLogged = sessionStorage.getItem('logged') === 'true';
    const profile = document.querySelector('.content-profile');
    const btnProfile = document.getElementById('btn-profile');
    const btnsNav = document.querySelectorAll('.btnsNav');

    if (isRegistered || isLogged) {
      sessionStorage.removeItem('registered');
      sessionStorage.removeItem('logged');

      if (profile) profile.style.display = 'none';
      if (btnProfile) btnProfile.style.display = 'none';

      btnsNav.forEach(btn => {
        btn.style.display = 'inline';
      });
    }
  }
});


// inputs adress

function activeInput() {
  const inputsAdress = document.querySelectorAll('.inputsAdress');

  inputsAdress.forEach(input => {
    input.removeAttribute('readonly');
  })

};

function saveInput() {
  const inputsAdress = document.querySelectorAll('.inputsAdress');

  inputsAdress.forEach(input => {
    input.setAttribute('readonly', true);
  })

};

let timeoutHide = null
function showMsg() {
  const alerta = document.getElementById("alerta");

  // Resetar animação se clicar várias vezes
  const barra = alerta.querySelector('.barra-tempo');
  const novaBarra = barra.cloneNode(true);
  barra.parentNode.replaceChild(novaBarra, barra);

  alerta.style.display = 'flex';
  setTimeout(() => {
    alerta.classList.add("ativa");
  }, 10); // Pequeno delay para aplicar a transição

  if (timeoutHide) {
    clearTimeout(timeoutHide);
  }


  // Esconder depois de 5 segundos
  timeoutEsconder = setTimeout(() => {
    alerta.classList.remove("ativa");
    setTimeout(() => {
      alerta.style.display = 'none';
    }, 300); // Espera a transição de fade-out
  }, 5000);
}

//add adress

//     const formAdress = document.getElementById('form-adress');

//     formAdress.addEventListener('submit', async (b) => {
//       b.preventDefault();

//       const cep = formAdress.cep.value;
//       const adress = formAdress.adress.value;
//       const numHouse = formAdress.numHouse.value;
//       const city = formAdress.city.value;
//       const state = formAdress.state.value;
//       const tel = formAdress.tel.value;

//      try {
//     const response = await fetch(`http://localhost:3000/user/${localStorage.setItem('userId')}`, {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             cep,
//             adress,
//             numHouse,
//             city,
//             state,
//             tel
//         })
//     });

//     const data = await response.json();

//     if (response.ok) {
//         console.log("Endereço atualizado", data);
//     } else {
//         console.error("Erro ao atualizar:", data.msg || data);
//     }

// } catch (err) {
//     console.error('Erro ao endereçar:', err);
// }


//     })


const menuToggle = document.querySelector('.menu-toggle');
const menuList = document.querySelector('.menu-list');

menuToggle.addEventListener('click', () => {
  const isHidden = menuList.classList.contains('hidden');

  // Mostra ou esconde o menu
  menuList.classList.toggle('hidden');

  // Alterna ícone do botão
  menuToggle.textContent = isHidden ? '☰' : '✖';
});

