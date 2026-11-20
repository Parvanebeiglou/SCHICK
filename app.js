const products = [
  { id: "denim-jacket", name: "The denim jacket", detail: "Washed denim · Women", price: 180, image: "images/10455.png", category: "Outerwear", department: "Women", styles: ["minimal", "classic"] },
  { id: "long-denim-coat", name: "The long denim coat", detail: "Soft structure · Women", price: 260, image: "images/Frame 2.png", category: "Outerwear", department: "Women", styles: ["classic", "street"] },
  { id: "leather-jacket", name: "The leather jacket", detail: "A little edge · Women", price: 210, image: "images/35546.png", category: "Outerwear", department: "Women", styles: ["street", "classic"] },
  { id: "black-jacket", name: "The everyday jacket", detail: "An easy layer · Women", price: 210, image: "images/20118.png", category: "Outerwear", department: "Women", styles: ["minimal", "classic"] },
  { id: "city-wool-coat", name: "The city wool coat", detail: "Double-faced wool · Unisex", price: 280, image: "images/1000045198.jpg", category: "Outerwear", department: "Unisex", styles: ["minimal", "classic"] },
  { id: "shearling-jacket", name: "The shearling jacket", detail: "A cozy statement · Women", price: 240, image: "images/25099.jpg", category: "Outerwear", department: "Women", styles: ["classic", "street"] },
  { id: "washed-overshirt", name: "The washed overshirt", detail: "Weekend uniform · Men", price: 180, image: "images/pexels_3086634_11981253.png", category: "Outerwear", department: "Men", styles: ["minimal", "street"] },
  { id: "longline-coat", name: "The longline coat", detail: "Made for layering · Men", price: 260, image: "images/pexels_vladimir_kudin_131638970_10141153.png", category: "Outerwear", department: "Men", styles: ["classic", "minimal"] },
  { id: "leather-overshirt", name: "The leather overshirt", detail: "A modern classic · Men", price: 210, image: "images/pexels_thomas_nguka_46791184_11434885.png", category: "Outerwear", department: "Men", styles: ["street", "classic"] },
  { id: "relaxed-jacket", name: "The relaxed jacket", detail: "Everyday, reworked · Men", price: 148, image: "images/pexels_gipain_8970564.png", category: "Outerwear", department: "Men", styles: ["minimal", "street"] },
  { id: "everyday-bag", name: "The everyday carryall", detail: "Room for your whole day · Women", price: 88, image: "images/bag.jpg", category: "Accessories", department: "Women", styles: ["minimal", "classic"] },
  { id: "milan-wool-coat", name: "The Milan wool coat", detail: "An easy city layer · Women", price: 285, image: "images/city-style.jpg", category: "Outerwear", department: "Women", styles: ["minimal", "classic"] },
  { id: "sunset-lounge-set", name: "The sunset lounge set", detail: "The matching moment · Women", price: 165, image: "images/street-style.jpg", category: "Sets", department: "Women", styles: ["street"] },
  { id: "graphic-tee", name: "The graphic cotton tee", detail: "A little attitude · Women", price: 58, image: "images/modern-style.jpg", category: "Tops", department: "Women", styles: ["street"] },
  { id: "city-utility-jacket", name: "The city utility jacket", detail: "Made for the everyday · Men", price: 195, image: "images/mens-style.jpg", category: "Outerwear", department: "Men", styles: ["street", "minimal"] },
  { id: "everyday-graphic-tee", name: "The everyday graphic tee", detail: "Soft cotton · Women", price: 54, image: "images/casual-style.jpg", category: "Tops", department: "Women", styles: ["street", "minimal"] },
  { id: "olive-city-coat", name: "The olive city coat", detail: "Soft tailoring · Women", price: 298, image: "images/outerwear-01.jpg", category: "Outerwear", department: "Women", styles: ["minimal", "classic"] },
  { id: "redline-sport-jacket", name: "The redline sport jacket", detail: "Lightweight shell · Women", price: 188, image: "images/outerwear-02.jpg", category: "Outerwear", department: "Women", styles: ["street"] },
  { id: "sunroom-fleece", name: "The sunroom fleece", detail: "Brushed cotton · Unisex", price: 128, image: "images/outerwear-03.jpg", category: "Outerwear", department: "Unisex", styles: ["minimal", "street"] },
  { id: "easy-wardrobe-layer", name: "The easy wardrobe layer", detail: "Relaxed overshirt · Men", price: 168, image: "images/outerwear-04.jpg", category: "Outerwear", department: "Men", styles: ["minimal", "classic"] },
  { id: "camel-tailored-blazer", name: "The camel tailored blazer", detail: "Soft-structured wool · Women", price: 248, image: "images/outerwear-06.jpg", category: "Outerwear", department: "Women", styles: ["classic", "minimal"] },
  { id: "black-drape-jacket", name: "The black drape jacket", detail: "An easy statement layer · Women", price: 215, image: "images/outerwear-07.jpg", category: "Outerwear", department: "Women", styles: ["minimal", "street"] },
  { id: "midnight-longline-coat", name: "The midnight longline coat", detail: "Brushed wool blend · Men", price: 285, image: "images/outerwear-09.jpg", category: "Outerwear", department: "Men", styles: ["classic", "minimal"] },
  { id: "washed-denim-overshirt", name: "The washed denim overshirt", detail: "Everyday denim · Women", price: 178, image: "images/tops-04.jpg", category: "Outerwear", department: "Women", styles: ["street", "minimal"] },
  { id: "rose-cropped-bomber", name: "The rose cropped bomber", detail: "Lightweight satin · Women", price: 198, image: "images/tops-07.jpg", category: "Outerwear", department: "Women", styles: ["street", "classic"] },
  { id: "soft-leather-trucker", name: "The soft leather trucker", detail: "A modern edge · Men", price: 320, image: "images/tops-08.jpg", category: "Outerwear", department: "Men", styles: ["street", "classic"] },
  { id: "soft-drape-blouse", name: "The soft drape blouse", detail: "Fluid satin · Women", price: 118, image: "images/tops-02.jpg", category: "Tops", department: "Women", styles: ["classic", "minimal"] },
  { id: "cotton-weekend-shirt", name: "The cotton weekend shirt", detail: "Easy cotton · Women", price: 88, image: "images/tops-03.jpg", category: "Tops", department: "Women", styles: ["minimal", "classic"] },
  { id: "linen-tunic-top", name: "The linen tunic top", detail: "Lightweight linen · Women", price: 98, image: "images/tops-05.jpg", category: "Tops", department: "Women", styles: ["minimal", "classic"] },
  { id: "everyday-oxford", name: "The everyday Oxford", detail: "Crisp cotton · Men", price: 92, image: "images/tops-06.jpg", category: "Tops", department: "Men", styles: ["classic", "minimal"] },
  { id: "modern-cotton-tee", name: "The modern cotton tee", detail: "Midweight cotton · Women", price: 52, image: "images/tops-09.jpg", category: "Tops", department: "Women", styles: ["street", "minimal"] },
  { id: "clean-cut-tee", name: "The clean-cut tee", detail: "Soft organic cotton · Men", price: 48, image: "images/tops-10.jpg", category: "Tops", department: "Men", styles: ["minimal", "classic"] },
  { id: "printed-lounge-tee", name: "The printed lounge tee", detail: "Relaxed cotton · Unisex", price: 58, image: "images/sets-01.jpg", category: "Tops", department: "Unisex", styles: ["street"] },
  { id: "fine-knit-polo", name: "The fine-knit polo", detail: "Textured cotton knit · Men", price: 108, image: "images/sets-05.jpg", category: "Tops", department: "Men", styles: ["classic", "minimal"] },
  { id: "graphic-studio-tee", name: "The graphic studio tee", detail: "Everyday jersey · Unisex", price: 56, image: "images/outerwear-08.jpg", category: "Tops", department: "Unisex", styles: ["street"] },
  { id: "soft-stripe-shirt", name: "The soft stripe shirt", detail: "Relaxed cotton poplin · Men", price: 96, image: "images/sets-06.jpg", category: "Tops", department: "Men", styles: ["classic", "minimal"] },
  { id: "graphic-lounge-coord", name: "The graphic lounge co-ord", detail: "A matching cotton pair · Women", price: 148, image: "images/sets-01.jpg", category: "Sets", department: "Women", styles: ["street", "minimal"] },
  { id: "denim-day-set", name: "The denim day set", detail: "Easy matching separates · Women", price: 188, image: "images/sets-02.jpg", category: "Sets", department: "Women", styles: ["street", "classic"] },
  { id: "coastal-linen-set", name: "The coastal linen set", detail: "Breezy two-piece linen · Women", price: 198, image: "images/sets-03.jpg", category: "Sets", department: "Women", styles: ["minimal", "classic"] },
  { id: "soft-weekend-set", name: "The soft weekend set", detail: "Comfort-first layers · Unisex", price: 158, image: "images/sets-04.jpg", category: "Sets", department: "Unisex", styles: ["minimal", "street"] },
  { id: "weekday-shirt-set", name: "The weekday shirt set", detail: "A polished shirt pairing · Men", price: 168, image: "images/sets-05.jpg", category: "Sets", department: "Men", styles: ["classic", "minimal"] },
  { id: "lightweight-denim-set", name: "The lightweight denim set", detail: "Soft denim separates · Men", price: 198, image: "images/sets-06.jpg", category: "Sets", department: "Men", styles: ["street", "classic"] },
  { id: "utility-two-piece", name: "The utility two-piece", detail: "Relaxed everyday cotton · Men", price: 178, image: "images/sets-07.jpg", category: "Sets", department: "Men", styles: ["street", "minimal"] },
  { id: "rose-lounge-set", name: "The rose lounge set", detail: "Soft jersey pair · Women", price: 138, image: "images/sets-08.jpg", category: "Sets", department: "Women", styles: ["minimal", "street"] },
  { id: "weekend-knit-set", name: "The weekend knit set", detail: "A cozy matching moment · Women", price: 168, image: "images/sets-09.jpg", category: "Sets", department: "Women", styles: ["minimal", "classic"] },
  { id: "studio-coord-set", name: "The studio co-ord", detail: "Clean-lined two-piece · Women", price: 185, image: "images/sets-10.jpg", category: "Sets", department: "Women", styles: ["minimal", "classic"] },
  { id: "structured-mini-bag", name: "The structured mini bag", detail: "A polished everyday carry · Women", price: 128, image: "images/accessories-01.jpg", category: "Accessories", department: "Women", styles: ["classic", "minimal"] },
  { id: "woven-crossbody", name: "The woven crossbody", detail: "Textured handwoven finish · Women", price: 110, image: "images/accessories-02.jpg", category: "Accessories", department: "Women", styles: ["classic", "street"] },
  { id: "pastel-evening-purse", name: "The pastel evening purse", detail: "A small pop of color · Women", price: 78, image: "images/accessories-03.jpg", category: "Accessories", department: "Women", styles: ["classic", "street"] },
  { id: "quilted-shoulder-bag", name: "The quilted shoulder bag", detail: "Soft leather-look finish · Women", price: 148, image: "images/accessories-04.jpg", category: "Accessories", department: "Women", styles: ["classic", "minimal"] },
  { id: "everyday-city-pack", name: "The everyday city pack", detail: "Hands-free daily carry · Unisex", price: 96, image: "images/accessories-05.jpg", category: "Accessories", department: "Unisex", styles: ["minimal", "street"] },
  { id: "minimal-steel-watch", name: "The minimal steel watch", detail: "A clean everyday dial · Unisex", price: 165, image: "images/accessories-06.jpg", category: "Accessories", department: "Unisex", styles: ["minimal", "classic"] },
  { id: "oval-sun-frames", name: "The oval sun frames", detail: "Lightweight acetate · Women", price: 74, image: "images/accessories-07.jpg", category: "Accessories", department: "Women", styles: ["classic", "street"] },
  { id: "printed-weekender", name: "The printed weekender", detail: "Room for a little more · Women", price: 138, image: "images/accessories-08.jpg", category: "Accessories", department: "Women", styles: ["street", "classic"] },
  { id: "blue-stone-pendant", name: "The blue stone pendant", detail: "A small color note · Women", price: 62, image: "images/accessories-09.jpg", category: "Accessories", department: "Women", styles: ["classic", "minimal"] },
  { id: "fine-chain-necklace", name: "The fine chain necklace", detail: "A delicate everyday layer · Women", price: 58, image: "images/accessories-10.jpg", category: "Accessories", department: "Women", styles: ["minimal", "classic"] },
];

const storageKeys = { cart: "schick-cart", wishlist: "schick-wishlist" };
const pageSize = 30;
const state = {
  category: "All",
  department: "All",
  query: "",
  sort: "featured",
  wishlistOnly: false,
  recommendations: false,
  maxPrice: null,
  preferredStyle: null,
  wishlist: [],
  cart: [],
};
let currentPage = 1;

const page = new URLSearchParams(window.location.search).get("page");
const shopPage = ["new-in", "women", "men", "explore"].includes(page) ? page : "home";
if (shopPage === "women" || shopPage === "men") {
  state.department = shopPage === "women" ? "Women" : "Men";
}

const productGrid = document.querySelector("#product-grid");
const pagination = document.querySelector(".pagination");
const emptyState = document.querySelector("#empty-state");
const resultsSummary = document.querySelector(".results-summary");
const cartDialog = document.querySelector("#cart-dialog");
const cartItems = document.querySelector("#cart-items");
const cartEmpty = document.querySelector("#cart-empty");
const toastRegion = document.querySelector(".toast-region");

function configurePage() {
  const isHome = shopPage === "home";
  const isExplore = shopPage === "explore";
  document.querySelector(".hero").hidden = !isHome;
  document.querySelector(".intro").hidden = !isHome;
  document.querySelector(".stylist-banner").hidden = !isHome;
  document.querySelector("#collection").hidden = isExplore;
  document.querySelector("#categories").hidden = !isHome && !isExplore;

  const pageTitles = {
    "new-in": ["SCHICK — New in", "New in the mix"],
    women: ["SCHICK — Women", "The women’s edit"],
    men: ["SCHICK — Men", "The men’s edit"],
    explore: ["SCHICK — Explore", "Explore the collection"],
  };
  if (pageTitles[shopPage]) {
    document.title = pageTitles[shopPage][0];
    document.querySelector("#collection-title").textContent = pageTitles[shopPage][1];
  }
  document.querySelectorAll(".main-nav [data-page]").forEach((link) => {
    if (link.dataset.page === shopPage) link.setAttribute("aria-current", "page");
  });
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toastRegion.append(toast);
  window.setTimeout(() => toast.remove(), 3200);
}

function readStoredList(key) {
  try {
    const stored = JSON.parse(localStorage.getItem(key) || "[]");
    if (!Array.isArray(stored)) throw new TypeError("Saved shop data is not a list.");
    return stored;
  } catch (error) {
    console.warn(`Could not read ${key} from local storage.`, error);
    showToast("We couldn't restore some saved shop details. Your session is still ready.");
    return [];
  }
}

function saveState(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Could not save ${key} to local storage.`, error);
    showToast("Your changes are active, but couldn't be saved for your next visit.");
  }
}

function money(amount) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

function getCartQuantity(productId) {
  return state.cart.find((item) => item.id === productId)?.quantity ?? 0;
}

function getVisibleProducts() {
  let visible = products.filter((product) => {
    const matchesCategory = state.category === "All" || product.category === state.category;
    const matchesDepartment = state.department === "All" || product.department === state.department || product.department === "Unisex";
    const matchesQuery = `${product.name} ${product.detail} ${product.category}`.toLowerCase().includes(state.query);
    const matchesWishlist = !state.wishlistOnly || state.wishlist.includes(product.id);
    const matchesBudget = state.maxPrice === null || product.price <= state.maxPrice;
    return matchesCategory && matchesDepartment && matchesQuery && matchesWishlist && matchesBudget;
  });

  if (state.recommendations) {
    visible = [...visible].sort((a, b) => {
      const scoreDifference = Number(b.styles.includes(state.preferredStyle)) - Number(a.styles.includes(state.preferredStyle));
      return scoreDifference || products.indexOf(a) - products.indexOf(b);
    });
  } else if (state.sort === "price-low") {
    visible.sort((a, b) => a.price - b.price);
  } else if (state.sort === "price-high") {
    visible.sort((a, b) => b.price - a.price);
  } else if (state.sort === "name") {
    visible.sort((a, b) => a.name.localeCompare(b.name));
  }
  return visible;
}

function renderPagination(pageCount) {
  pagination.hidden = pageCount <= 1;
  if (pageCount <= 1) {
    pagination.innerHTML = "";
    return;
  }

  const pageButtons = Array.from({ length: pageCount }, (_, index) => {
    const number = index + 1;
    const current = number === currentPage;
    return `<button class="page-number" type="button" data-page-number="${number}" aria-label="Page ${number}" ${current ? 'aria-current="page"' : ""}>${number}</button>`;
  }).join("");

  pagination.innerHTML = `
    <button class="pagination-direction" type="button" data-page-action="previous" ${currentPage === 1 ? "disabled" : ""}>Previous</button>
    <div class="pagination-pages" role="group" aria-label="Choose a page">${pageButtons}</div>
    <button class="pagination-direction" type="button" data-page-action="next" ${currentPage === pageCount ? "disabled" : ""}>Next</button>`;
}

function renderProducts() {
  const visible = getVisibleProducts();
  const pageCount = Math.max(1, Math.ceil(visible.length / pageSize));
  currentPage = Math.min(currentPage, pageCount);
  const firstProduct = (currentPage - 1) * pageSize;
  const pageProducts = visible.slice(firstProduct, firstProduct + pageSize);

  productGrid.innerHTML = pageProducts.map((product) => {
    const isSaved = state.wishlist.includes(product.id);
    const quantity = getCartQuantity(product.id);
    return `
      <article class="product-card">
        <div class="product-image-wrap">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          <button class="favorite-button" type="button" data-favorite="${product.id}" aria-label="${isSaved ? "Remove from" : "Add to"} saved items" aria-pressed="${isSaved}">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-9-5.5-9-12a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.5-9 12-9 12Z"></path></svg>
          </button>
        </div>
        <div class="product-info">
          <div class="product-copy"><h3 class="product-name">${product.name}</h3><p class="product-detail">${product.detail}</p></div>
          <p class="product-price">${money(product.price)}</p>
        </div>
        <div class="product-quantity" role="group" aria-label="Quantity of ${product.name} in your bag">
          <button type="button" data-quantity="${product.id}" data-change="-1" aria-label="Remove one ${product.name}" ${quantity === 0 ? "disabled" : ""}>−</button>
          <span aria-live="polite" aria-label="${quantity} in bag">${quantity}</span>
          <button type="button" data-quantity="${product.id}" data-change="1" aria-label="Add one ${product.name}">+</button>
        </div>
      </article>`;
  }).join("");

  productGrid.hidden = pageProducts.length === 0;
  emptyState.hidden = visible.length !== 0;
  renderPagination(pageCount);
  const count = visible.length;
  const suffix = count === 1 ? "piece" : "pieces";
  const range = visible.length > pageSize ? `Showing ${firstProduct + 1}-${Math.min(firstProduct + pageSize, count)} of ` : "";
  resultsSummary.textContent = `${range}${count} ${suffix}${state.recommendations ? " in your personal edit" : state.wishlistOnly ? " saved for later" : ""}`;
}

function updateHeaderCounts() {
  const itemCount = state.cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelector(".cart-count").textContent = itemCount;
  document.querySelector(".wishlist-count").textContent = state.wishlist.length;
  document.querySelector(".cart-heading-count").textContent = `(${itemCount})`;
}

function renderCart() {
  const hasItems = state.cart.length > 0;
  cartItems.hidden = !hasItems;
  cartEmpty.hidden = hasItems;
  document.querySelector(".cart-summary").hidden = !hasItems;
  const subtotal = state.cart.reduce((total, item) => {
    const product = products.find((entry) => entry.id === item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  cartItems.innerHTML = state.cart.map((item) => {
    const product = products.find((entry) => entry.id === item.id);
    if (!product) return "";
    return `
      <article class="cart-item">
        <img src="${product.image}" alt="" />
        <div class="cart-item-copy">
          <strong>${product.name}</strong>
          <small>${product.detail}</small>
          <div class="quantity-control" aria-label="Quantity for ${product.name}">
            <button type="button" data-quantity="${product.id}" data-change="-1" aria-label="Remove one ${product.name}">−</button>
            <span>${item.quantity}</span>
            <button type="button" data-quantity="${product.id}" data-change="1" aria-label="Add one ${product.name}">+</button>
          </div>
        </div>
        <div class="cart-item-end"><strong>${money(product.price * item.quantity)}</strong><button class="remove-item" type="button" data-remove="${product.id}">Remove</button></div>
      </article>`;
  }).join("");
  document.querySelector(".cart-subtotal").textContent = money(subtotal);
  updateHeaderCounts();
}

function toggleFavorite(productId, button) {
  if (state.wishlist.includes(productId)) {
    state.wishlist = state.wishlist.filter((id) => id !== productId);
    button.setAttribute("aria-pressed", "false");
    button.setAttribute("aria-label", "Add to saved items");
  } else {
    state.wishlist.push(productId);
    button.setAttribute("aria-pressed", "true");
    button.setAttribute("aria-label", "Remove from saved items");
  }
  saveState(storageKeys.wishlist, state.wishlist);
  updateHeaderCounts();
  if (state.wishlistOnly) renderProducts();
}

function changeCartQuantity(productId, change) {
  const product = products.find((entry) => entry.id === productId);
  if (!product) return;

  const cartItem = state.cart.find((item) => item.id === productId);
  if (cartItem) {
    cartItem.quantity += change;
    if (cartItem.quantity <= 0) state.cart = state.cart.filter((item) => item.id !== productId);
  } else if (change > 0) {
    state.cart.push({ id: productId, quantity: change });
  } else {
    return;
  }

  saveState(storageKeys.cart, state.cart);
  renderCart();
  renderProducts();
}

function setCategory(category) {
  state.category = category;
  currentPage = 1;
  document.querySelectorAll(".filter-chip").forEach((chip) => {
    const isActive = chip.dataset.category === category;
    chip.classList.toggle("is-active", isActive);
    chip.setAttribute("aria-pressed", String(isActive));
  });
  renderProducts();
}

document.querySelectorAll(".filter-chip").forEach((button) => {
  button.addEventListener("click", () => {
    state.wishlistOnly = false;
    state.recommendations = false;
    state.maxPrice = null;
    setCategory(button.dataset.category);
  });
});

document.querySelector("#product-search").addEventListener("input", (event) => {
  state.query = event.target.value.trim().toLowerCase();
  currentPage = 1;
  document.querySelector("#collection").hidden = false;
  renderProducts();
});

document.querySelector("#sort-products").addEventListener("change", (event) => {
  state.sort = event.target.value;
  state.recommendations = false;
  currentPage = 1;
  renderProducts();
});

pagination.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button || button.disabled) return;

  const visibleCount = getVisibleProducts().length;
  const pageCount = Math.ceil(visibleCount / pageSize);
  const targetPage = button.dataset.pageNumber
    ? Number(button.dataset.pageNumber)
    : currentPage + (button.dataset.pageAction === "next" ? 1 : -1);
  if (!Number.isInteger(targetPage) || targetPage < 1 || targetPage > pageCount || targetPage === currentPage) return;

  currentPage = targetPage;
  renderProducts();
  document.querySelector("#collection").scrollIntoView({ behavior: "smooth" });
});

document.querySelectorAll("[data-category]:not(.filter-chip)").forEach((control) => {
  control.addEventListener("click", () => {
    state.department = "All";
    state.wishlistOnly = false;
    state.recommendations = false;
    state.maxPrice = null;
    setCategory(control.dataset.category);
    document.querySelector("#collection").hidden = false;
    document.querySelector("#collection").scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelector(".wishlist-toggle").addEventListener("click", () => {
  state.wishlistOnly = !state.wishlistOnly;
  state.department = "All";
  state.query = "";
  state.recommendations = false;
  state.maxPrice = null;
  document.querySelector("#product-search").value = "";
  setCategory("All");
  if (state.wishlistOnly && state.wishlist.length === 0) showToast("Save a piece with the heart to find it here.");
  document.querySelector("#collection").hidden = false;
  document.querySelector("#collection").scrollIntoView({ behavior: "smooth" });
});

productGrid.addEventListener("click", (event) => {
  const favoriteButton = event.target.closest("[data-favorite]");
  const quantityButton = event.target.closest("[data-quantity]");
  if (favoriteButton) toggleFavorite(favoriteButton.dataset.favorite, favoriteButton);
  if (quantityButton) changeCartQuantity(quantityButton.dataset.quantity, Number(quantityButton.dataset.change));
});

cartItems.addEventListener("click", (event) => {
  const quantityButton = event.target.closest("[data-quantity]");
  const removeButton = event.target.closest("[data-remove]");
  if (quantityButton) {
    changeCartQuantity(quantityButton.dataset.quantity, Number(quantityButton.dataset.change));
  }
  if (removeButton) {
    state.cart = state.cart.filter((item) => item.id !== removeButton.dataset.remove);
    saveState(storageKeys.cart, state.cart);
    renderCart();
    renderProducts();
  }
});

document.querySelector(".cart-toggle").addEventListener("click", () => cartDialog.showModal());
document.querySelectorAll(".stylist-open").forEach((button) => {
  button.addEventListener("click", () => document.querySelector("#stylist-dialog").showModal());
});
document.querySelectorAll("[data-close-dialog]").forEach((button) => {
  button.addEventListener("click", () => button.closest("dialog").close());
});
document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});
document.querySelector(".cart-continue").addEventListener("click", () => cartDialog.close());

document.querySelector("#stylist-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const answers = new FormData(event.currentTarget);
  const style = answers.get("style");
  const department = answers.get("department");
  const budget = answers.get("budget");
  state.department = department;
  state.category = "All";
  state.query = "";
  state.wishlistOnly = false;
  state.recommendations = true;
  state.maxPrice = budget === "any" ? null : Number(budget);
  state.preferredStyle = style;
  state.sort = "featured";
  document.querySelector("#product-search").value = "";
  document.querySelector("#sort-products").value = "featured";
  setCategory("All");
  document.querySelector("#stylist-dialog").close();
  document.querySelector("#collection").scrollIntoView({ behavior: "smooth" });
  showToast("Your personal edit is ready.");
});

document.querySelector(".reset-filters").addEventListener("click", () => {
  state.department = "All";
  state.query = "";
  state.wishlistOnly = false;
  state.recommendations = false;
  state.maxPrice = null;
  state.sort = "featured";
  document.querySelector("#product-search").value = "";
  document.querySelector("#sort-products").value = "featured";
  setCategory("All");
});

document.querySelector("#newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  showToast("Thanks for your interest. Newsletter sign-up isn't connected in this demo yet.");
  event.currentTarget.reset();
});

document.querySelector(".checkout-button").addEventListener("click", () => {
  showToast("Checkout isn't connected in this demo yet. Your bag is saved.");
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
configurePage();
state.wishlist = readStoredList(storageKeys.wishlist).filter((id) => products.some((product) => product.id === id));
state.cart = readStoredList(storageKeys.cart)
  .filter((item) => item && products.some((product) => product.id === item.id) && Number.isInteger(item.quantity) && item.quantity > 0);
renderProducts();
renderCart();
