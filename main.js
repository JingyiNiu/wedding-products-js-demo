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
  if (category == "0") {
    // if category value is 0, load all data;
    loadData();
  } else {
    // else, add new items to products array depending on their category ID
    products = rawdata.filter((product) => product.categoryId == category);
    renderData(products);
  }
  resetPriceFilter();
  resetSortByFilter();
}

// price filter
function filterPrice() {
  const priceRange = document.querySelector("#price").value; // get price range value
  switch (priceRange) {
    case "all":
      productsFiltered = products;
      break;
    case "0-100":
      productsFiltered = products.filter((product) => product.price <= 100);
      break;
    case "101-500":
      productsFiltered = products.filter(
        (product) => product.price > 100 && product.price <= 500
      );
      break;
    case "501-1000":
      productsFiltered = products.filter(
        (product) => product.price > 500 && product.price <= 1000
      );
      break;
    case "1000+":
      productsFiltered = products.filter((product) => product.price > 1000);
      break;
    default:
      break;
  }
  renderData(productsFiltered); // render html with new array
  resetSortByFilter();
}

// when ordering filter is changes, trigger this function and pass products array to sort function
function handleSortArray() {
  const priceValue = document.querySelector("#price");
  if (priceValue.selectedIndex == 0) {
    sort(products);
  } else {
    sort(productsFiltered);
  }
}

// sort products array accroding to low to high or high to low
function sort(array) {
  const sortBy = document.querySelector("#sort-by").value;
  if (sortBy == "lowtohigh") {
    lowToHigh(array);
  } else if (sortBy == "hightolow") {
    highToLow(array);
  } else {
    console.log("something wrong with sort function");
  }
}

// sort by price low to high
function lowToHigh(array) {
  array.sort((a, b) => a.price - b.price);
  renderData(array);
}

// sort by price high to low
function highToLow(array) {
  array.reverse((a, b) => a.price - b.price);
  renderData(array);
}

// render items inside products array to index.html
function renderData(productsArray) {
  let productItem = "";
  if (productsArray.length == 0) {
    document.querySelector("#fromData").innerHTML = "No Match Found";
  } else {
    productsArray.forEach((product) => {
      if (product.productMedia[0] && product.productMedia[0].url) {
        let imgUrl =
          "https://storage.googleapis.com/luxe_media/wwwroot/" +
          product.productMedia[0].url;
        let urlParams = "./details.html?prodId=" + product.prodId;

        productItem += `
                  <div class="display-item" >
                    <a href="${urlParams}">
                      <img
                        src="${imgUrl}"
                        alt="image"
                      />
                      <div class="item-description">
                        <h6>${product.title}</h6>
                        <p>$ ${product.price}</p>
                      </div>
                    </a>
                  </div>`;
      }
      document.querySelector("#fromData").innerHTML = productItem;
    });
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