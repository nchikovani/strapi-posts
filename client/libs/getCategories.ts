import {ENDPOINT} from "../constants";

const getCategories = async (filterUrl?: string) => {
  const filter = filterUrl ? `?filters[segment_name][$eq]=${filterUrl}` : ''
  const categoriesRes = await fetch(`${ENDPOINT}/api/categories${filter}`);
  const categories = await categoriesRes.json();
  return filterUrl ? categories.data[0] : categories.data;
};

export default getCategories;