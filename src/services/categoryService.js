import { supabase } from "../libs/supabase.js";

export async function getCategories() {
    const { data, error } = await supabase
        .from("categories")
        .select(`*, products(count)`);

    if (error) throw error;

    return data;
}

export async function createCategories(category) {
    const { data, error } = await supabase
        .from("categories")
        .insert([
            {
                ...category,
            }
        ]);

        if (error) throw error;

        return data;
}

export async function updateCategories(id, category) {
    const { data, error } = await supabase
        .from("categories")
        .update({
            ...category,
        })
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    return data;
}

export async function deleteCategories(id) {
    const { data: category, error: fetchError } = await supabase
        .from("categories")
        .select(`name, products(count)`)
        .eq("id", id)
        .single();

    if (fetchError) throw fetchError;

    const productCount = category.products?.[0]?.count ?? 0;
    if (productCount > 0) {
        throw new Error(
            `Cannot delete '${category.name}' — it still has ${productCount} product(s) assigned.`
        );
    }

    const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", id);

    if (error) throw error;
}
