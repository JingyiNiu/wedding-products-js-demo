loadData();

// load all data from data.js and render data into index.html
function loadData() {
  products = [];
  for (let product of rawdata) {
    products.push(product);
  }
  renderData(products);
}

// category filter
function filterCategory() {
  const category = document.querySelector("#category").value; // get category value
  products = []; // initialize products array
  if (category == "0") {
    // if category value is 0, load all data;
    loadData();
  } else {
    // else, add new items to products array depending on their category ID
    for (let product of rawdata) {
      if (product.categoryId == category) {
        products.push(product);
      }
    }
    renderData(products);
  }
}

// price filter
function filterPrice() {
  const priceRange = document.querySelector("#price").value;
  productsFiltered = [];
  for (let product of products) {
    switch (priceRange) {
      case "all":
        productsFiltered.push(product);
        break;
      case "0-100":
        if (product.price <= 100) {
          productsFiltered.push(product);
        }
        break;
      case "101-500":
        if (product.price > 100 && product.price <= 500) {
            productsFiltered.push(product);
          }
        break;
      case "501-1000":
        if (product.price > 500 && product.price <= 1000) {
            productsFiltered.push(product);
          }
        break;
      case "1000+":
        if (product.price > 1000) {
            productsFiltered.push(product);
          }
        break;
      default:
        break;
    }
  }
  renderData(productsFiltered);
}

// render items inside products array to index.html
function renderData(productsArray) {
  let productItem = "";
  for (let i of productsArray) {
    if (i.productMedia[0] && i.productMedia[0].url) {
      let imgUrl =
        "https://storage.googleapis.com/luxe_media/wwwroot/" +
        i.productMedia[0].url;
      let urlParams =
        "./details.html?prodId=" + i.prodId + "&prodTitle=" + i.title;

      productItem += `
            <div class="display-item" >
            <a href="${urlParams}">
              <img
                src="${imgUrl}"
                alt="image"
              />
              <div class="item-description">
                <h6>${i.title}</h6>
                <p>$ ${i.price}</p>
              </div>
            </a>
          </div>`;
    }
    document.querySelector("#fromData").innerHTML = productItem;
  }
}

// sort by price low to high
function sortBy() {
  const sortBy = document.querySelector("#sort-by").value;
  console.log(sortBy);
}
