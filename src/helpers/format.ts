export const FormatDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
}

export const FormatAmount = (amount: number) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);
}

// Day-Month-Year Hour:Minute
export const FormatDateTime = (date: string) => {
    const newDate = new Date(date);
    return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}`;
}