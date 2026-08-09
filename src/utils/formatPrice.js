export function formatPrice(price) {
    if(isNaN(price) || price === null || price === undefined) {
        return "฿-";
    }
    return `฿${(Number(price)).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
}