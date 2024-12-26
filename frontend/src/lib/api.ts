export const getEntityURL = (paths: string[]): string => {
    const baseURL = 'http://localhost:4000'
    return `${baseURL}/${paths.join('/')}`;
}

