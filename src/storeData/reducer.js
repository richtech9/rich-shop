const addToWishlist = (state, payload) => {
  const newData = [...state.whishlist, payload];
  localStorage.setItem("whishlist", JSON.stringify(newData));
  return { ...state, whishlist: newData };
};

const removeWishlist = (state, id) => {
  const newData = state.whishlist.filter((v) => v.id != id);
  localStorage.setItem("whishlist", JSON.stringify(newData));
  return { ...state, whishlist: newData };
};

const addToCart = (state, payload) => {
  const newData = [...state.cartData, payload];
  localStorage.setItem("cartdata", JSON.stringify(newData));
  return { ...state, cartData: newData };
};

// cart update all time *********//
const updateCart = (state, payload) => {
  localStorage.setItem("cartdata", JSON.stringify(payload));
  return { ...state, cartData: payload };
};

const removeCart = (state, id) => {
  const newData = state.cartData.filter((v) => v.cart_id != id);
  localStorage.setItem("cartdata", JSON.stringify(newData));
  return { ...state, cartData: newData };
};

const increaseQty = (state, id) => {
  const newData = state.cartData.map((data) => {
    if (data.product_id == id) {
      return { ...data, qty: data.qty + 1 };
    }
    return data;
  });
  localStorage.setItem("cartdata", JSON.stringify(newData));
  return { ...state, cartData: newData };
};

const decreaseQty = (state, id) => {
  const newData = state.cartData
    .map((data) => {
      if (data.product_id == id) {
        return { ...data, qty: data.qty - 1 };
      }
      return data;
    })
    .filter((v) => v.qty != 0);

  localStorage.setItem("cartdata", JSON.stringify(newData));
  return { ...state, cartData: newData };
};

const login = (state, payload) => {
  localStorage.setItem("user", JSON.stringify(payload));
  return { ...state, user: payload };
};

const logout = (state) => {
  localStorage.removeItem("user");
  return { ...state, user: null };
};

const setSiteData = (state, data) => {
  let obj = {};

  data.map((v) => {
    switch (v.type) {
      case "footer_logo":
        obj = { ...obj, footer_logo: v.value };
        break;
      case "about_us_description":
        obj = { ...obj, about_us_description: v.value };
        break;
      case "contact_address":
        obj = { ...obj, contact_address: v.value };
        break;
      case "contact_email":
        obj = { ...obj, contact_email: v.value };
        break;
      case "contact_phone":
        obj = { ...obj, contact_phone: v.value };
        break;
      case "facebook_link":
        obj = { ...obj, facebook_link: v.value };
        break;
      case "twitter_link":
        obj = { ...obj, twitter_link: v.value };
        break;
      case "instagram_link":
        obj = { ...obj, instagram_link: v.value };
        break;
      case "youtube_link":
        obj = { ...obj, youtube_link: v.value };
        break;
      case "linkedin_link":
        obj = { ...obj, linkedin_link: v.value };
        break;
      case "website_name":
        obj = { ...obj, website_name: v.value };
        break;
      case "site_motto":
        obj = { ...obj, site_motto: v.value };
        break;
      case "site_icon":
        obj = { ...obj, site_icon: v.value };
        break;
      case "meta_title":
        obj = { ...obj, meta_title: v.value };
        break;
      case "meta_description":
        obj = { ...obj, meta_description: v.value };
        break;
      case "meta_keywords":
        obj = { ...obj, meta_keywords: v.value };
        break;
      case "meta_image":
        obj = { ...obj, meta_image: v.value };
        break;
      case "system_logo_white":
        obj = { ...obj, logo: v.value };
        break;

      default:
        break;
    }
  });
  return { ...state, siteData: obj };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL_CATEGORY_AND_PRODUCTS":
      return { ...state, ...action.payload };
      break;
    case "SET_SETTING":
      return { ...state, generalSettings: action.payload };
      break;

    case "ADD_TO_WHISHLIST":
      return addToWishlist(state, action.payload);
      break;

    case "ADD_TO_CART":
      return addToCart(state, action.payload);
      break;

    case "UPDATE_CART":
      return updateCart(state, action.payload);
      break;

    case "SET_CART_DATA":
      return { ...state, cartData: action.payload };
      break;

    case "SET_WHISHLIST_DATA":
      return { ...state, whishlist: action.payload };
      break;

    case "REMOVE_TO_WHISHLIST":
      return removeWishlist(state, action.payload.id);
      break;

    case "REMOVE_TO_CART":
      return removeCart(state, action.payload.id);
      break;

    case "INCREASE_QTY":
      return increaseQty(state, action.payload.id);
      break;

    case "DECREASE_QTY":
      return decreaseQty(state, action.payload.id);
      break;

    case "CLEAR_CART":
      return { ...state, cartData: [] };
      break;

    case "LOGIN":
      return login(state, action.payload);
      break;

    case "SET_LOGIN":
      return { ...state, user: action.payload };
      break;

    case "LOG_OUT":
      return logout(state);

    case "SET_SITE_DATA":
      return setSiteData(state, action.payload);
      break;

    default:
      return state;
  }
};

export default reducer;
