loadData();

// load all data from data.js and render data into index.html
function loadData() {
  products = [];
  for (let product of rawdata) {
    products.push(product);
  }
  renderData();
}

// category filter
function filterCategory() {
  const category = document.getElementById("category").value; // get category value
  products = [];// initialize products array
  if (category == "0") { // if category value is 0, load all data; 
    loadData();
  } else { // else, add new items to products array depending on their category ID
    for (let product of rawdata) {
      if (product.categoryId == category) {
        products.push(product);
      }
    }
    renderData();
  }
}

// render items inside products array to index.html
function renderData() {
  let productItem = "";
  for (let i of products) {
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
    document.getElementById("fromData").innerHTML = productItem;
  }
}
