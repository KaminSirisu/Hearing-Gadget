import { supabase } from "../libs/supabase.js";

export async function getSettings() {
    const { data, error } = await supabase
        .from("settings")
        .select("*")
        .limit(1)
        .maybeSingle();

    if (error) throw error;

    return data;
}

export async function createDefaultSettings() {
    const { data, error } = await supabase
        .from("settings")
        .insert({
            company_name: "",
            company_description: "",
            logo_url: null,
            phone: "",
            email: "",
            address: "",
            google_maps_url: null,
            facebook_url: null,
            line_url: null,
            instagram_url: null,
        })
        .select()
        .single();

    if (error) throw error;

    return data;
}

export async function updateSettings(id, settings) {
    const { data, error } = await supabase
        .from("settings")
        .update({
            ...settings,
            updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    return data;
}
