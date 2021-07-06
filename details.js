// get product id from url
let urlString = window.location;
let url = new URL(urlString);
let productId = url.searchParams.get("prodId");
console.log(productId);

// get product item from rawdata
const productItem = getProduct(productId);

function getProduct(id) {
  item = rawdata.filter(item => item.prodId == id);
  return item;
}

// get item information from product item
productName = productItem[0].title;
id = productItem[0].prodId;
price = productItem[0].price;
description = productItem[0].description;
imgParam = productItem[0].productMedia[0].url;
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
