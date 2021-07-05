// get product id from url
let urlString = window.location;
let url = new URL(urlString);
let productId = url.searchParams.get("prodId");
console.log(productId);

// get product item from rawdata
const productItem = getProduct(productId);

function getProduct(id) {
  for (let item of rawdata) {
    if (item.prodId == id) {
      return item;
    }
  }
}

// get item information from product item
productName = productItem.title;
id = productItem.prodId;
price = productItem.price;
description = productItem.description;
imgParam = productItem.productMedia[0].url;
imgUrl = `https://storage.googleapis.com/luxe_media/wwwroot/${imgParam}`;

// insert into html
document.querySelector("#details").innerHTML = `
<div class="item-details row">
    <div class="details-img col-md">
        <img
            src=${imgUrl}
            alt="image"
        />
    </div>
    <div class="details-content col-md">
        <h3>${productName}</h3>
        <br>
        <p><b>Product id</b>: ${id}</p>
        <p><b>Price:</b> $ ${price}</p>
        <p><b>Description:</b></p>
        <p>${description}</p>
    </div>
</div>
`;
