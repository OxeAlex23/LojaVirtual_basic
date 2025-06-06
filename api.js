async function getProductsData() {
    const response = await fetch('https://apiproducts-prl4.onrender.com/products');

    if (!response.ok) {
        throw new Error(`Erro ao buscar Produto`);
    }

    return response.json();
};

async function showPro() {
    try {
        const products = await getProductsData();
        const container = document.querySelector('.container');
        const adsDefault = document.querySelector('.ads-default');
        const adsDefault2 = document.querySelector('.ads-default-2');
        container.style.display = 'grid';
        adsDefault.style.display = 'none';
        adsDefault2.style.display = 'none';

        products.forEach(product => {
            const divProduct = document.createElement('div');
            const divProductIten = document.createElement('div');
            const title = document.createElement('h3');
            const spanImg = document.createElement('span');
            const img = document.createElement('img');
            const price = document.createElement('span');
            const stock = document.createElement('span');
            const tags = document.createElement('span');
            const description = document.createElement('span');
            const btnCart = document.createElement('button');
            const btnBuyNow = document.createElement('button');
            const category = document.createElement('span');


            container.appendChild(divProduct);

            img.src = product.img;
            spanImg.appendChild(img);

            divProduct.classList.add("product");
            divProductIten.classList.add("product-item")
            title.id = "product-title";
            spanImg.id = "span-image";
            img.id = "product-img";
            img.classList.add("product-img")
            price.id = "product-price";
            stock.id = "product-stock";
            tags.id = 'tags';
            btnCart.id = 'btn-add-cart';
            btnCart.classList.add('btn-add-cart');
            btnBuyNow.id = 'btn-buy-now';
            btnBuyNow.classList.add('btn-buy-now');
            category.classList.add('category');
            category.id = 'category';
            description.id = 'description';

            title.textContent = product.name;
            price.textContent = `R$ ${product.price}`;
            stock.textContent = `Estoque: ${product.stock} uni.`;
            tags.textContent = `${product.tags}`;
            category.textContent = `${product.category}`;
            description.textContent = product.description;
            btnCart.textContent = 'Add ao carrinho';
            btnBuyNow.textContent = 'Comprar Agora';

            divProduct.appendChild(divProductIten)
            divProductIten.append(title, spanImg, price, stock, tags, btnCart, btnBuyNow, category, description);
        });

        console.log('Dados carregados com sucesso');

        const allProducts = document.querySelectorAll('.product');

        allProducts.forEach((productDiv, index) => {
            productDiv.addEventListener('click', (event) => {
                const ignoreIds = ["category", "btn-buy-now", "btn-add-cart"];

                if (!ignoreIds.includes(event.target.id)) {
                    const selectedProduct = products[index];
                    const encodedName = encodeURIComponent(selectedProduct.name);
                    const encodedImg = encodeURIComponent(selectedProduct.img);
                    const encodedPrice = encodeURIComponent(selectedProduct.price);
                    const encodedStock = encodeURIComponent(selectedProduct.stock);
                    const encodedCategory = encodeURIComponent(selectedProduct.category);
                    const encodedDescription = encodeURIComponent(selectedProduct.description);

                    // Redireciona passando o nome na URL
                    window.location.href = `infoProduct.html?name=${encodedName}&img=${encodedImg}&price=${encodedPrice}&stock=${encodedStock}&category=${encodedCategory}&description=${encodedDescription}`;
                }
            });
        });

        const btnAddCart = document.querySelectorAll('.btn-add-cart');
        const isLogged = sessionStorage.getItem('logged');

        const productCart = document.querySelector('.product-cart');
        const titleCart = document.createElement('h1');
        const spanImg = document.createElement('span');
        const spanPrice = document.createElement('span');
        const spanStock = document.createElement('span');
        const spanCategory = document.createElement('span');
        const spanDescription = document.createElement('span');


        btnAddCart.forEach(btnAdd => {
            btnAdd.addEventListener('click', () => {
                const pai = btnAdd.parentElement;
                const childrens = pai.children;
                const childrenArray = Array.from(childrens);

                // Corrigir verificação de login
                if (!isLogged) {
                    window.location.href = 'register.html';
                    return; // interrompe execução se não estiver logado
                }

                // Criar novo elemento para o produto do carrinho
                const productCart = document.createElement('div');
                productCart.classList.add('product-cart');

                const titleCart = document.createElement('h3');
                const spanImg = document.createElement('span'); // Pode usar <img> se quiser imagem
                const spanPrice = document.createElement('span');
                const spanStock = document.createElement('span');
                const spanCategory = document.createElement('span');
                const spanDescription = document.createElement('span');
                const btnBuyNow = document.createElement('button');
                const btnDeleteIten = document.createElement('button');

                // Preencher com os dados
                titleCart.textContent = childrenArray[0].textContent;
                //  spanImg.textContent = 'Imagem'; // Ajuste aqui se tiver imagem
                spanPrice.textContent = childrenArray[2].textContent;
                spanStock.textContent = childrenArray[3].textContent;
                spanCategory.textContent = childrenArray[7].textContent;
                spanDescription.textContent = childrenArray[8].textContent;
                btnBuyNow.textContent = 'Comprar Agora';
                btnDeleteIten.textContent = 'Excluir';
                btnDeleteIten.id = 'btn-delete-iten';
                btnBuyNow.id = 'btn-buy-now-cart';

                // Montar produto
                productCart.append(titleCart, spanImg, spanPrice, spanStock, spanCategory, spanDescription, btnBuyNow, btnDeleteIten);

                // Adicionar ao carrinho
                const allProductsCart = document.querySelector('.all-products-cart');
                allProductsCart.appendChild(productCart);

                function enableRemoveFromCart(btnDeleteIten) {
                    btnDeleteIten.addEventListener('click', () => {
                        const productElement = btnDeleteIten.parentElement;
                        productElement.remove();
                    });
                }

                enableRemoveFromCart(btnDeleteIten);
            });
        });







        const btnBuyNow = document.querySelectorAll('.btn-buy-now');

        btnBuyNow.forEach(btnBuy => {
            btnBuy.addEventListener('click', () => {
                if (!isLogged === true) {
                    window.location.href = 'register.html'
                } else {
                    console.log('pode comprar')
                }
            })
        })

    } catch (error) {
        console.error(error);
    }
};

showPro()


