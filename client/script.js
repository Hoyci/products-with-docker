let globalProducts;

function createProduct() {
  const newProduct = {
    name: `produto ${globalProducts.length + 1}`,
    price: Math.floor(Math.random() * 990) + 10,
  };

  fetch("http://localhost:3000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  })
    .then(() => {
      fetchData();
    })
    .catch((error) => {
      console.error("Erro na requisição:", error);
      alert("Erro ao criar produto");
    });
}

function deleteProduct(event) {
  const productId = event.target.dataset.id;

  fetch(`http://localhost:3000/${productId}`, {
    method: "DELETE",
  })
    .then(() => {
      fetchData();
    })
    .catch((error) => {
      console.error("Erro na requisição:", error);
      alert("Erro ao deletar produto");
    });
}

function mountProducts() {
  if (globalProducts.length === 0) {
    const dataDiv = document.getElementById("data");
    dataDiv.innerHTML = `
          <h1>Nenhum produto encontrado!</h1>
        `;
    return;
  }

  const dataDiv = document.getElementById("data");

  const productsHTML = globalProducts.map((product) => {
    return `
          <div class="flex items-start justify-between">
            <div>
              <h1>Nome: ${product.name}</h1>
              <span>Preço: R$ ${product.price}</span>
            </div>
            <button
              data-id=${product.id}
              class="deleteProductBtn bg-red-100 p-2 rounded-md hover:opacity-70"
            >
              Deletar
            </button>
          </div>
        `;
  });

  dataDiv.innerHTML = productsHTML.join("");

  const deleteProductBtns = document.querySelectorAll(".deleteProductBtn");
  deleteProductBtns.forEach((button) => {
    button.addEventListener("click", deleteProduct);
  });
}

function fetchData() {
  fetch("http://localhost:3000")
    .then((response) => response.json())
    .then((data) => {
      const { products } = data;
      globalProducts = products;
      mountProducts();
    })
    .catch((error) => {
      console.error("Erro ao buscar dados:", error);
      globalProducts = [];
    });
}

document.addEventListener("DOMContentLoaded", function () {
  fetchData();

  const createProductBtn = document.getElementById("createProductBtn");
  createProductBtn.addEventListener("click", createProduct);
});
