import { MostViewed } from "components/shared/MostViewed/MostViewed";
import { ProductDetails } from "components/Product/ProductDetails/ProductDetails";
import axios from "axios";

const { PublicLayout } = require("layout/PublicLayout");

const breadcrumbsData = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Shop",
    path: "/shop",
  },
  {
    label: "Product",
    path: "/product",
  },
];
const SingleProductPage = ({ product, slug }) => {
  return (
    <PublicLayout breadcrumb={breadcrumbsData} breadcrumbTitle="Shop">
      <ProductDetails product={product} slug={slug} />
      <MostViewed
        additionalClass="product-viewed"
        pid={product ? product.id : 0}
      />
    </PublicLayout>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await axios.get("product/details/" + id);
  //const data = await res.json();
  //console.log(res);
  if (res.data.success) {
    const product = res.data.data;

    return {
      props: { product, id }, // will be passed to the page component as props
    };
  }
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default SingleProductPage;
