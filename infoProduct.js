 document.addEventListener('DOMContentLoaded', () => {
            const params = new URLSearchParams(window.location.search);
            const productName = params.get('name');
            const productImg = params.get('img');
            const productPrice = params.get('price');
            const productStock = params.get('stock');
            const productCategory = params.get('category');
            const productDescription = params.get('description');

            const titlePage = document.querySelector('#title-page');
            const imgPage = document.querySelector('#img-page');
            const spanPrice = document.querySelector('#span-price')
            const spanStock = document.querySelector('#span-stock')
            const spanCategory = document.querySelector('#span-category');
            const spanDescription = document.querySelector('#span-description');

            const name = decodeURIComponent(productName);
            const img = decodeURIComponent(productImg);
            const price = decodeURIComponent(productPrice);
            const stock = decodeURIComponent(productStock);
            const category = decodeURIComponent(productCategory);
            const description = decodeURIComponent(productDescription);
        
            if (productName && productImg) {
                titlePage.textContent = `${name}`
                imgPage.src = `${img}`
                spanPrice.textContent = `R$ ${price}`;
                spanStock.textContent = `Estoque ${stock}`;
                spanCategory.textContent = `${category}`;
                spanDescription.textContent = `${description}`
            } else {
                titlePage.textContent = 'Produto não encontrado';
            }
        });