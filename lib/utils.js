export const Currency = (amount) => {
    const formatter = Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    })
    
    return formatter.format(amount).replace(/\s/g, '');
}
