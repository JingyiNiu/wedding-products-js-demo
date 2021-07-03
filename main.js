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
  resetPriceFilter();
  resetSortByFilter();
}

// price filter
function filterPrice() {
  const priceRange = document.querySelector("#price").value; // get price range value
  productsFiltered = []; // initialize a new array
  for (let product of products) {
    // loop through current products array
    switch (priceRange) {
      case "all":
        productsFiltered.push(product); // push products to the new array
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
  renderData(productsFiltered); // render html with new array
  resetSortByFilter();
}

// sort by price low to high
function sortBy() {
  const sortBy = document.querySelector("#sort-by").value;
  console.log(sortBy);
  const priceValue = document.querySelector("#price");
  if (priceValue.selectedIndex == 0) {
    // 如果还没有按价格范围来筛选，适用products array
    if (sortBy == "lowtohigh") {
      products.sort(function (a, b) {
        return a.price - b.price;
      });
    }
    if (sortBy == "hightolow") {
      products.reverse(function (a, b) {
        return a.price - b.price;
      });
    }
    renderData(products);
  } else {
    // 如果已经筛选过价格范围，适用productsFiltered array
    if (sortBy == "lowtohigh") {
      productsFiltered.sort(function (a, b) {
        return a.price - b.price;
      });
    }
    if (sortBy == "hightolow") {
      productsFiltered.reverse(function (a, b) {
        return a.price - b.price;
      });
    }
    renderData(productsFiltered);
  }
}

// render items inside products array to index.html
function renderData(productsArray) {
  let productItem = "";
  if (productsArray.length == 0) {
    document.querySelector("#fromData").innerHTML = "No Match Found";
  } else {
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
}

// reset price filter
function resetPriceFilter() {
  const priceValue = document.querySelector("#price");
  priceValue.selectedIndex = 0;
}

// reset sort-by filter
function resetSortByFilter() {
  const soryByValue = document.querySelector("#sort-by");
  soryByValue.selectedIndex = 0;
}
