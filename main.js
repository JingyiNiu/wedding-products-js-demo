loadData();

function loadData() {
  products = [];
  for (let product of rawdata) {
    products.push(product);
  }
  renderData();
}

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
