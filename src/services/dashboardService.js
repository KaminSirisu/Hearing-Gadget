import { supabase } from '../libs/supabase.js';
import { getSettings } from './settingsService.js';
import { calculateSetupProgress } from '../utils/calculateSetupProgress.js';

export async function getProductStats() {
    const { data, error, count } = await supabase
        .from("products")
        .select("*", { count: 'exact', head: true });

    if (error) throw error;

    return {
        totalProducts: count
    };
}

export async function getCategoryStats() {
    const { data, error, count } = await supabase
        .from("categories")
        .select("*", { count: 'exact', head: true });

    if (error) throw error;

    return {
        totalCategories: count
    };
}

export async function getRecentProducts() {
    const { data, error } = await supabase
        .from("products")
        .select(`
            id,
            name,
            updated_at,
            categories(name),
            product_images(image_path, display_order)
        `)
        .order('updated_at', { ascending: false })
        .limit(3);

    if (error) throw error;

    return data;
}

export async function getWebsiteVisitorStats() {
    // TODO: replace with real PostHog query in V2
    return {
        count: null,
        percentChange: null
    };
}

export async function getVisitorTrend(days = 7) {
    // TODO: replace with real PostHog query in V2
    return {
        trend: []
    }
}

export async function getWebsiteChecklist() {
    const settings = await getSettings();
    if (!settings) {
        throw new Error('Failed to fetch setting table');
    }
    const CHECKLIST_FIELDS = [
        { field: 'logo_url', label: 'Logo' },
        { field: 'phone', label: 'Phone' },
        { field: 'email', label: 'Email' },
        { field: 'google_maps_url', label: 'Google Maps' },
        { field: 'facebook_url', label: 'Facebook' },
    ];
    const checklist = CHECKLIST_FIELDS.map(item => {
        return {
            label: item.label,
            completed: settings[item.field] !== null && settings[item.field] !== ''
        }
    })
    return checklist;
}

export async function getDashboardData() {
    const [
        productStats,
        categoryStats,
        analytics,
        visitorTrend,
        checklistData,
        recentProducts,
    ] = await Promise.all([
        getProductStats(),
        getCategoryStats(),
        getWebsiteVisitorStats(),
        getVisitorTrend(),
        getWebsiteChecklist(),
        getRecentProducts()
    ])

    return {
        stats: {
            ...productStats,
            ...categoryStats
        },
        analytics,
        visitorTrend,
        checklist: checklistData,
        websiteStatus: calculateSetupProgress(checklistData),
        recentProducts
    }
}