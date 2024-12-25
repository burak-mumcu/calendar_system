export const getEntityURL = (paths: string[]): string => {
    const baseURL = import.meta.env.API_BASE_URL;
    return `${baseURL}/${paths.join('/')}`;
}

