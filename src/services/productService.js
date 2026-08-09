import { supabase } from "../libs/supabase.js";
import { slugify } from "../utils/slugify.js";
import { getCategories } from "./categoryService.js";

export async function getProducts() {
    const { data, error } = await supabase
        .from("products")
        .select(`
            *,
            categories(name),
            product_images(
                image_path,
                display_order
            )
        `);

    if (error) throw error;

    return data;
}

export async function getProduct(id) {
    const { data, error } = await supabase
        .from("products")
        .select(`
            *,
            categories(name),
            product_images(
                image_path,
                display_order
            )
        `)
        .eq("id", id)
        .single();

    if (error) throw error;

    return data;
}

export async function createProduct(product) {
    const productData = {
        ...product,
        slug: slugify(product.name),
        price: Number(product.price),
    }
    
    const { data, error } = await supabase
        .from("products")
        .insert(productData)
        .select()
        .single();

        if (error) throw error;

        return data;
}

export async function updateProduct(id, product) {
    const { image, ...productData } = product;

    productData.slug = slugify(productData.name);
    productData.price = Number(productData.price);

    const { data, error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    return data;
}

export async function deleteProduct(id) {
    const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

    if (error) throw error;
};

export async function getProductsPageData() {
    const [
        products,
        categories
    ] = await Promise.all([
        getProducts(),
        getCategories()
    ])

    return {
        products,
        categories
    }
}