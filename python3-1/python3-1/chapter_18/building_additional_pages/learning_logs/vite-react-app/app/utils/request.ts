const useReq = (origin = 'http://127.0.0.1:8000') => {
    return (url: string, ...args: any[]) => fetch(`${origin}${url}`, ...args)
}

export default useReq;
