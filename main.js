const main = document.querySelector("#main");
const library = document.querySelector(".library");
const createBtn = document.querySelector(".create-btn");
const sobreposicao = document.querySelector(".sobreposição-central");
const addBtn = document.querySelector(".add-btn");

// Array dos Livros Adicionados.
const myLibrary = [];

// Constructor
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Prototype Function para Alterar o "Lido"
Book.prototype.toggleRead = function () {
  if (this.read === "Sim") {
    this.read = "Não";
  } else {
    this.read = "Sim";
  }
};

// Função para adicionar o livro no array
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  renderBooks();
}

// Função para renderizar os livros
function renderBooks() {
  // Reinicia as Divs e atualiza de acordo com as Novas.
  library.innerHTML = "";

  // como ele n vai retornar nada, é melhor utilizar o ForEach do que o MAP.
  myLibrary.forEach((book) => {
    const elemento = document.createElement("div");

    // Adiciona a classe "book"
    elemento.classList.add("book");

    // adiciona o id que ta no Book na Div.
    elemento.dataset.id = book.id;

    // Cria a Div com esses Itens:
    elemento.innerHTML = `
      <p>Nome do Livro: ${book.title}</p>
      <p>Nome do Autor: ${book.author}</p>
      <p>Quantidade de Paginas: ${book.pages}</p>
      <p>Já leu esse livro? ${book.read}</p>

      <button class="changeBtn btn">Alterar Status</button>
      <button class="removeBtn btn">Excluir</button>
    `;

    const changeBtn = elemento.querySelector(".changeBtn");

    changeBtn.addEventListener("click", (evt) => {
      book.toggleRead();
      renderBooks();
    });

    const removeBtn = elemento.querySelector(".removeBtn");

    removeBtn.addEventListener("click", () => {
      // Pega o ID do livro que está nesse card
      const id = elemento.dataset.id;

      // Procura esse livro dentro do array
      const index = myLibrary.findIndex((book) => book.id === id);
      console.log(index);

      // Remove o livro do array
      myLibrary.splice(index, 1);

      // Remove o card da tela
      library.removeChild(elemento);

      console.log(myLibrary);
    });

    library.appendChild(elemento);
  });
}

// Botão para mostrar o formulário
createBtn.addEventListener("click", () => {
  sobreposicao.classList.remove("none");
});

addBtn.addEventListener("click", () => {
  const title = document.querySelector(".title").value;
  const author = document.querySelector(".author").value;
  const pages = Number(document.querySelector(".pages").value);
  const read = document.querySelector('input[name="read"]:checked').value;

  if (!title || !author || !pages) {
    alert("Coloque as informações corretas!");
  } else {
    addBookToLibrary(title, author, pages, read);
    sobreposicao.classList.add("none");

    console.log(myLibrary);
  }
});
