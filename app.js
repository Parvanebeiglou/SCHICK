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
  { id: "everyday-bag", name: "The everyday carryall", detail: "Room for your whole day · Unisex", price: 88, image: "images/bag.jpg", category: "Accessories", department: "Unisex", styles: ["minimal", "classic"] },
  { id: "milan-wool-coat", name: "The Milan wool coat", detail: "An easy city layer · Women", price: 285, image: "images/city-style.jpg", category: "Outerwear", department: "Women", styles: ["minimal", "classic"] },
  { id: "sunset-lounge-set", name: "The sunset lounge set", detail: "The matching moment · Women", price: 165, image: "images/street-style.jpg", category: "Sets", department: "Women", styles: ["street"] },
  { id: "graphic-tee", name: "The graphic cotton tee", detail: "A little attitude · Unisex", price: 58, image: "images/modern-style.jpg", category: "Tops", department: "Unisex", styles: ["street"] },
  { id: "city-utility-jacket", name: "The city utility jacket", detail: "Made for the everyday · Men", price: 195, image: "images/mens-style.jpg", category: "Outerwear", department: "Men", styles: ["street", "minimal"] },
  { id: "everyday-graphic-tee", name: "The everyday graphic tee", detail: "Soft cotton · Women", price: 54, image: "images/casual-style.jpg", category: "Tops", department: "Women", styles: ["street", "minimal"] },
];

const storageKeys = { cart: "schick-cart", wishlist: "schick-wishlist" };
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

const productGrid = document.querySelector("#product-grid");
const emptyState = document.querySelector("#empty-state");
const resultsSummary = document.querySelector(".results-summary");
const cartDialog = document.querySelector("#cart-dialog");
const cartItems = document.querySelector("#cart-items");
const cartEmpty = document.querySelector("#cart-empty");
const toastRegion = document.querySelector(".toast-region");

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

function renderProducts() {
  const visible = getVisibleProducts();
  productGrid.innerHTML = visible.map((product) => {
    const isSaved = state.wishlist.includes(product.id);
    const quantity = getCartQuantity(product.id);
    return `
      <article class="product-card">
        <div class="product-image-wrap">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          <button class="favorite-button" type="button" data-favorite="${product.id}" aria-label="${isSaved ? "Remove from" : "Add to"} saved items" aria-pressed="${isSaved}">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35 10.55 20C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.51L12 21.35Z"></path></svg>
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

  productGrid.hidden = visible.length === 0;
  emptyState.hidden = visible.length !== 0;
  const count = visible.length;
  const suffix = count === 1 ? "piece" : "pieces";
  resultsSummary.textContent = `${count} ${suffix}${state.recommendations ? " in your personal edit" : state.wishlistOnly ? " saved for later" : ""}`;
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
  renderProducts();
});

document.querySelector("#sort-products").addEventListener("change", (event) => {
  state.sort = event.target.value;
  state.recommendations = false;
  renderProducts();
});

document.querySelectorAll("[data-department]").forEach((control) => {
  control.addEventListener("click", (event) => {
    event.preventDefault();
    state.department = control.dataset.department;
    state.wishlistOnly = false;
    state.recommendations = false;
    state.maxPrice = null;
    setCategory("All");
    document.querySelector("#collection").scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelectorAll("[data-category]:not(.filter-chip)").forEach((control) => {
  control.addEventListener("click", () => {
    state.department = "All";
    state.wishlistOnly = false;
    state.recommendations = false;
    state.maxPrice = null;
    setCategory(control.dataset.category);
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
state.wishlist = readStoredList(storageKeys.wishlist).filter((id) => products.some((product) => product.id === id));
state.cart = readStoredList(storageKeys.cart)
  .filter((item) => item && products.some((product) => product.id === item.id) && Number.isInteger(item.quantity) && item.quantity > 0);
renderProducts();
renderCart();
