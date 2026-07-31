import { supabase } from '../libs/supabase.js';

export async function uploadProductImage(file) {
    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
        .from("product-images")
        .upload(fileName, file);

    if (error) throw error;

    return fileName;
}

export async function deleteProductImageFromStorage(path) {
    const { error } = await supabase.storage
        .from("product-images")
        .remove([path]);

    if (error) throw error;
}

export function getImageUrl(path, bucket = "product-images"){

    return supabase.storage
        .from(bucket)
        .getPublicUrl(path)
        .data.publicUrl;
}

export async function uploadCompanyLogo(file) {
    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
        .from("setting-assets")
        .upload(fileName, file);

    if (error) throw error;

    return fileName;
}

export async function deleteCompanyLogoFromStorage(path) {
    const { error } = await supabase.storage
        .from("setting-assets")
        .remove([path]);

    if (error) throw error;
}