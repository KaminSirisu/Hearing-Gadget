import { supabase } from "../libs/supabase";
import { toast } from "react-toastify";

export async function getProductImage(productId) {
    const { data, error } = await supabase
        .from("product_images")
        .select("*")
        .eq("product_id", productId)
        .single();

    if (error) throw error;

    return data;
}

export async function createProductImage(data) {
    const { data: image, error } = await supabase
        .from("product_images")
        .insert(data)
        .select()
        .single();

    if (error) {
        toast.error(error.message);
        throw error;
    }
    return image;
}

export async function updateProductImage(productId, imagePath) {
    const { data, error } = await supabase
        .from("product_images")
        .update({
            image_path: imagePath
        })
        .eq("product_id", productId)
        .select()
        .single();
    
    if (error) {
        toast.error(error.message);
        throw error;
    }

    return data;
}

export async function deleteProductImage(productId) {
    const { error } = await supabase
        .from("product_images")
        .delete()
        .eq("product_id", productId);

    if (error) throw error;
}