let products;
let products_list = document.getElementById("products_list")
let loader = document.getElementById("loader")

async function getProducts() {

   let res = await fetch(`https://fakestoreapi.com/products`, {
      method: "GET"
   })
      .finally(() => {
         loader.classList.add("hidden")

      })

   res = await res.json()

   render(res)
   products = res



}

getProducts()



function render(products) {
   let fragment = document.createDocumentFragment()
   products_list.innerHTML = null
   products.forEach(item => {

      let div1 = document.createElement("div")
      div1.classList.add("row-span-1", "p-4", "border", "border-[#444444]", "rounded-md")

      let div_img = document.createElement("div")
      div_img.classList.add("w-[full]", "overflow-hidden")

      let product_img = document.createElement("img")
      product_img.src = item.image
      product_img.alt = item.title
      product_img.classList.add("rounded-md", "w-[323px]", "h-[350px]", "object-cover")

      div_img.appendChild(product_img)

      let div_title = document.createElement("div")
      div_title.classList.add(
         "flex",
         "flex-col",
         "items-start",
         "gap-4"
      );

      let h1 = document.createElement("h1")
      h1.textContent = item.title.length >= 5 ? item.title.slice(0, 20) + " ..." : item.title;

      let p = document.createElement("p")
      p.textContent = item.description.length >= 10 ? item.description.slice(0, 50) + " ..." : item.description;

      let categoriy_span = document.createElement("span")
      categoriy_span.textContent = item.category.name
      categoriy_span.classList.add(
         "bg-[#333333]",
         "rounded-xl",
         "py-1",
         "px-3",
         "text-[gray]"
      );

      div_title.appendChild(h1)
      div_title.appendChild(p)
      div_title.appendChild(categoriy_span)

      let div_bottom = document.createElement("div")
      div_bottom.classList.add("flex", "justify-between", "items-end", "w-[full]")

      let div_price = document.createElement("div")
      div_price.classList.add("flex", "flex-col", "my-2")

      let price_span = document.createElement("span")
      price_span.textContent = "price"
      price_span.classList.add("text-[gray]")

      let dollar_span = document.createElement("span")
      dollar_span.textContent = item.price + "$"

      div_price.appendChild(price_span)
      div_price.appendChild(dollar_span)
      div_bottom.appendChild(div_price)

      let button = document.createElement("button")
      button.textContent = "Add to Card"
      button.classList.add("px-3", "py-2", "bg-[#885DF8]", "rounded-md", "active:bg-[#885DF8]/50")
      button.setAttribute("onclick", `addToCatch(${item.id})`)

      div_bottom.appendChild(button)

      div1.appendChild(div_img)
      div1.appendChild(div_title)
      div1.appendChild(div_bottom)

      fragment.appendChild(div1)


   });
   products_list.appendChild(fragment)
}

let Category_list = document.getElementById("Category_list")

function category() {
   fetch(`https://fakestoreapi.com/products/categories`, {
      method: "GET"
   })
      .then((res) => {
         return res.json()
      })
      .then((res) => {
         res = ["all", ...res]
         renderCategory(res)

      })
      .catch((err) => {
         console.log(err);

      });
}

category()

async function catogoryId(i) {
   if (i === "all") {
      getProducts();
      return;
   }

   let catogoryId = await fetch(`https://fakestoreapi.com/products/category/${i}`, {
      method: "GET"
   });
   catogoryId = await catogoryId.json();

   render(catogoryId);
}


catogoryId()


function renderCategory(categoris) {


   categoris.forEach((categoria) => {

      let span_category = document.createElement("button")
      span_category.textContent = categoria
      span_category.setAttribute("onclick", `catogoryId("${categoria}")`)
      span_category.classList.add("p-2", "text-start", "w-[220px]", "bg-[black]", "active:bg-[black]/70")
      Category_list.appendChild(span_category)



   })
}


let search_input = document.querySelector("#search_input");
let product_card = [];



fetch('https://fakestoreapi.com/products')
   .then((response) => response.json())
   .then((data) => {
      products = data; 
      render(products); 
   })
   .catch((error) => console.error('API xatosi:', error));

function search() {
   if (!products || products.length === 0) {
      console.error("Products hali yuklanmagan yoki bo'sh!");
      return;
   }

   const product = products.find((item) => {
      return item.title.toLowerCase().includes(search_input.value.trim().toLowerCase());
   });

   if (product) {
      render([product]);
   } else {
      console.log("Mahsulot topilmadi!");
      products_list.innerHTML = "<p>mahsulot topilmadi!</p>";
   }

   clear();
}




function clear() {
   search_input.value = ""
}




let store_index = document.getElementById("store_index");
let store_box = document.getElementById("store_box");

let card = [];
let i = 0;

async function addToCatch(id) {
   let product = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "GET",
   });

   product = await product.json();

   let exists = card.some(item => item.id === product.id);

   if (exists) {
      console.log("mahsulot savatda bor!");
   } else {
      card.push({ ...product, count: 1 });
      i++;
      store_index.textContent = i;
      updateSum();

      render_store(card);
   }
}

let Allprice = document.createElement("div")


function render_store(item) {
   store_box.innerHTML = null
   fragment = document.createDocumentFragment()

   let div2 = document.createElement("div")
   div2.classList.add("w-[full]", "h-[24px]", "text-end", "mb-4")

   Allprice.classList.add("w-[full]", "h-[24px]", "text-start", "mb-4")

   let btn_x = document.createElement("button")
   btn_x.setAttribute("onclick", "storeRender()")
   btn_x.textContent = "x"



   div2.appendChild(btn_x)
   store_box.appendChild(div2)
   store_box.appendChild(Allprice)

   item.forEach((product) => {

      let div1 = document.createElement("div")
      div1.classList.add("p-4", "border", "border-[#444444]", "rounded-md", "col-span-1", "mt-5" ,"xs:text-start")

      let div_img = document.createElement("div")
      div_img.classList.add("w-[100%]", "flex", "gap-3", "items-center","xs:justify-start", "md:justify-between" ,"xs:flex-col" ,"lg:flex-row")

      let product_img = document.createElement("img")
      product_img.src = product.image
      product_img.alt = product.title
      product_img.classList.add("rounded-md", "w-[120px]", "h-[100px]", "object-cover")

      let div_title = document.createElement("div")

      let title = document.createElement("p")
      title.textContent = product.title.length >= 10 ? product.description.slice(0, 20) + " ..." : product.description;

      let price = document.createElement("span")
      price.textContent = "$" + product.price

      let div_left = document.createElement("div")
      div_left.classList.add("flex", "gap-3")


      div_title.appendChild(title)
      div_title.appendChild(price)

      div_left.appendChild(product_img)
      div_left.appendChild(div_title)
      div_img.appendChild(div_left)

      let remove_btn = document.createElement("button")
      remove_btn.classList.add("border", "p-2", "bg-[#885df8]", "active:bg-[#885df8]/60", "rounded-lg", "border-[#141414]")
      remove_btn.textContent = "remove"
      remove_btn.setAttribute("onclick", `removeProduct(${product.id})`)

      let minus_btn = document.createElement("button")
      minus_btn.classList.add("border", "p-2", "bg-[#885df8]", "active:bg-[#885df8]/60", "rounded-lg", "border-[#141414]")
      minus_btn.textContent = "-"
      minus_btn.setAttribute("onclick", `sageru(${product.id})`)

      let count = document.createElement("span")
      count.textContent = product.count

      let plus_btn = document.createElement("button")
      plus_btn.classList.add("border", "p-2", "bg-[#885df8]", "active:bg-[#885df8]/60", "rounded-lg", "border-[#141414]")
      plus_btn.textContent = "+"
      plus_btn.setAttribute("onclick", `ageru(${product.id})`)

      div_btn = document.createElement("div")
      div_btn.classList.add("flex", "items-center", "gap-2")




      div_btn.appendChild(remove_btn)
      div_btn.appendChild(minus_btn)
      div_btn.appendChild(count)
      div_btn.appendChild(plus_btn)

      div_img.appendChild(div_btn)
      div1.appendChild(div_img)


      fragment.appendChild(div1)

      store_box.appendChild(fragment)
   })


}

let Allsum = 0;

function ageru(id) {
   let find_product = card.find((item) => {
      return item.id == id;
   });

   if (find_product.rating.count > find_product.count) {
      find_product.count++;
   }

   updateSum();
   render_store(card);
}

function updateSum() {
   Allsum = card.reduce((total, product) => {
      return total + product.count * product.price;
   }, 0);

   Allprice.textContent = "Total Price: " + Math.round(Allsum) + " $";
}


function sageru(id) {
   let find_product = card.find((item) => {
      return item.id == id;
   });

   if (find_product.count > 1) {
      find_product.count--;
   }

   updateSum()
   render_store(card);
}


function removeProduct(id) {
   const index = card.findIndex(item => item.id === id);
   if (index !== -1) {
      card.splice(index, 1);
      render_store(card);
      i--;
      store_index.textContent = i;
      updateSum();

   } else {
      alert(`bunday mahsulot yo'q!`);
   }




}





function storeRender() {

   store_box.classList.toggle("translate-x-[1000px]")

}




