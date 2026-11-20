const products = window.SCHICK_PRODUCTS;
if (!Array.isArray(products)) throw new Error("The product catalog could not be loaded.");

const storageKeys = { cart: "schick-cart", wishlist: "schick-wishlist" };
const pageSize = 30;
const page = new URLSearchParams(window.location.search).get("page");
const shopPage = ["new-in", "women", "men", "explore"].includes(page) ? page : "home";

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.querySelector(".toast-region").append(toast);
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

function money(amount) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

function getVisibleProducts(filters) {
  const query = filters.query.trim().toLowerCase();
  const visible = products.filter((product) => {
    const matchesCategory = filters.category === "All" || product.category === filters.category;
    const matchesDepartment = filters.department === "All" || product.department === filters.department || product.department === "Unisex";
    const matchesQuery = `${product.name} ${product.detail} ${product.category}`.toLowerCase().includes(query);
    const matchesWishlist = !filters.wishlistOnly || filters.wishlist.includes(product.id);
    const matchesBudget = filters.maxPrice === null || product.price <= filters.maxPrice;
    return matchesCategory && matchesDepartment && matchesQuery && matchesWishlist && matchesBudget;
  });

  if (filters.recommendations) {
    return visible.sort((a, b) => {
      const scoreDifference = Number(b.styles.includes(filters.preferredStyle)) - Number(a.styles.includes(filters.preferredStyle));
      return scoreDifference || products.indexOf(a) - products.indexOf(b);
    });
  }

  const sorters = {
    "price-low": (a, b) => a.price - b.price,
    "price-high": (a, b) => b.price - a.price,
    name: (a, b) => a.name.localeCompare(b.name),
  };
  return sorters[filters.sort] ? visible.sort(sorters[filters.sort]) : visible;
}

const restoredWishlist = readStoredList(storageKeys.wishlist)
  .filter((id) => products.some((product) => product.id === id));
const restoredCart = readStoredList(storageKeys.cart)
  .filter((item) => item && products.some((product) => product.id === item.id) && Number.isInteger(item.quantity) && item.quantity > 0);

const viewModel = {
  category: ko.observable("All"),
  department: ko.observable(shopPage === "women" ? "Women" : shopPage === "men" ? "Men" : "All"),
  query: ko.observable(""),
  sort: ko.observable("featured"),
  wishlistOnly: ko.observable(false),
  recommendations: ko.observable(false),
  maxPrice: ko.observable(null),
  preferredStyle: ko.observable("minimal"),
  wishlist: ko.observableArray(restoredWishlist),
  cart: ko.observableArray(restoredCart),
  currentPage: ko.observable(1),
  stylistDepartment: ko.observable("All"),
  stylistBudget: ko.observable("any"),
  currentYear: new Date().getFullYear(),
  money,

  visibleProducts: null,
  pageCount: null,
  pageNumbers: null,
  paginatedProducts: null,
  resultsSummary: null,
  cartItems: null,
  cartCount: null,
  wishlistCount: null,
  cartSubtotal: null,

  isSaved(productId) {
    return this.wishlist().includes(productId);
  },

  cartQuantity(productId) {
    return this.cart().find((item) => item.id === productId)?.quantity ?? 0;
  },

  selectCategory(category) {
    this.wishlistOnly(false);
    this.recommendations(false);
    this.maxPrice(null);
    this.category(category);
  },

  showCollection() {
    document.querySelector("#collection").hidden = false;
    document.querySelector("#collection").scrollIntoView({ behavior: "smooth" });
  },

  goToPage(pageNumber) {
    this.currentPage(pageNumber);
    this.showCollection();
  },

  previousPage() {
    if (this.currentPage() > 1) this.goToPage(this.currentPage() - 1);
  },

  nextPage() {
    if (this.currentPage() < this.pageCount()) this.goToPage(this.currentPage() + 1);
  },

  toggleFavorite(productId) {
    const saved = this.wishlist();
    this.wishlist(saved.includes(productId)
      ? saved.filter((id) => id !== productId)
      : [...saved, productId]);
  },

  toggleWishlist() {
    const showSaved = !this.wishlistOnly();
    this.wishlistOnly(showSaved);
    this.department("All");
    this.query("");
    this.recommendations(false);
    this.maxPrice(null);
    this.category("All");
    if (showSaved && this.wishlist().length === 0) showToast("Save a piece with the heart to find it here.");
    this.showCollection();
  },

  changeCartQuantity(productId, change) {
    const existing = this.cart().find((item) => item.id === productId);
    let updatedCart;
    if (existing) {
      updatedCart = this.cart()
        .map((item) => item.id === productId ? { ...item, quantity: item.quantity + change } : item)
        .filter((item) => item.quantity > 0);
    } else if (change > 0 && products.some((product) => product.id === productId)) {
      updatedCart = [...this.cart(), { id: productId, quantity: change }];
    } else {
      return;
    }
    this.cart(updatedCart);
  },

  removeFromCart(productId) {
    this.cart(this.cart().filter((item) => item.id !== productId));
  },

  openCart() {
    document.querySelector("#cart-dialog").showModal();
  },

  openStylist() {
    document.querySelector("#stylist-dialog").showModal();
  },

  closeDialog(_data, event) {
    event.currentTarget.closest("dialog").close();
  },

  submitStylist() {
    this.department(this.stylistDepartment());
    this.category("All");
    this.query("");
    this.wishlistOnly(false);
    this.recommendations(true);
    this.maxPrice(this.stylistBudget() === "any" ? null : Number(this.stylistBudget()));
    this.sort("featured");
    this.showCollection();
    document.querySelector("#stylist-dialog").close();
    showToast("Your personal edit is ready.");
  },

  resetFilters() {
    this.department("All");
    this.query("");
    this.wishlistOnly(false);
    this.recommendations(false);
    this.maxPrice(null);
    this.sort("featured");
    this.category("All");
  },

  newsletter() {
    showToast("Thanks for your interest. Newsletter sign-up isn't connected in this demo yet.");
    document.querySelector("#newsletter-form").reset();
  },

  checkout() {
    showToast("Checkout isn't connected in this demo yet. Your bag is saved.");
  },
};

viewModel.visibleProducts = ko.pureComputed(() => {
  return getVisibleProducts({
    category: viewModel.category(),
    department: viewModel.department(),
    query: viewModel.query(),
    sort: viewModel.sort(),
    wishlist: viewModel.wishlist(),
    wishlistOnly: viewModel.wishlistOnly(),
    maxPrice: viewModel.maxPrice(),
    recommendations: viewModel.recommendations(),
    preferredStyle: viewModel.preferredStyle(),
  });
});

viewModel.pageCount = ko.pureComputed(() => Math.max(1, Math.ceil(viewModel.visibleProducts().length / pageSize)));
viewModel.pageNumbers = ko.pureComputed(() => Array.from({ length: viewModel.pageCount() }, (_, index) => index + 1));
viewModel.paginatedProducts = ko.pureComputed(() => {
  const visible = viewModel.visibleProducts();
  const firstProduct = (viewModel.currentPage() - 1) * pageSize;
  return visible.slice(firstProduct, firstProduct + pageSize);
});
viewModel.resultsSummary = ko.pureComputed(() => {
  const count = viewModel.visibleProducts().length;
  const suffix = count === 1 ? "piece" : "pieces";
  const firstProduct = (viewModel.currentPage() - 1) * pageSize;
  const range = count > pageSize ? `Showing ${firstProduct + 1}-${Math.min(firstProduct + pageSize, count)} of ` : "";
  const context = viewModel.recommendations()
    ? " in your personal edit"
    : viewModel.wishlistOnly() ? " saved for later" : "";
  return `${range}${count} ${suffix}${context}`;
});
viewModel.cartItems = ko.pureComputed(() => viewModel.cart().map((item) => ({
  ...item,
  product: products.find((product) => product.id === item.id),
})).filter((item) => item.product));
viewModel.cartCount = ko.pureComputed(() => viewModel.cart().reduce((total, item) => total + item.quantity, 0));
viewModel.wishlistCount = ko.pureComputed(() => viewModel.wishlist().length);
viewModel.cartSubtotal = ko.pureComputed(() => viewModel.cartItems()
  .reduce((total, item) => total + item.product.price * item.quantity, 0));

[
  viewModel.category,
  viewModel.department,
  viewModel.query,
  viewModel.sort,
  viewModel.wishlistOnly,
  viewModel.recommendations,
  viewModel.maxPrice,
  viewModel.wishlist,
].forEach((observable) => observable.subscribe(() => viewModel.currentPage(1)));
viewModel.sort.subscribe(() => viewModel.recommendations(false));
viewModel.cart.subscribe((cart) => saveState(storageKeys.cart, cart));
viewModel.wishlist.subscribe((wishlist) => saveState(storageKeys.wishlist, wishlist));

document.querySelectorAll(".stylist-open").forEach((button) => {
  button.addEventListener("click", viewModel.openStylist);
});
document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});

configurePage();
ko.applyBindings(viewModel);
