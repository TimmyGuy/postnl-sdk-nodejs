export function objectToSearchParams(obj: any) {
    const searchParams = new URLSearchParams();
    Object.keys(obj).forEach(key => {
        searchParams.append(key, obj[key]);
    })
    return searchParams;
}