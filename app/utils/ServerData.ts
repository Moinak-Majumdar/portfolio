class ServerData {
    private uri: string;
    private revalidate: number;

    constructor(path: string, revalidate: number = 3600) {
        this.uri = process.env.NEXT_PUBLIC_TEST_DB ? `${process.env.NEXT_PUBLIC_SERVER}/${path}?testDb=${process.env.NEXT_PUBLIC_TEST_DB}` : `${process.env.NEXT_PUBLIC_SERVER}/${path}`
        this.revalidate = revalidate;
    }

    async get(body: object = {}): Promise<Response> {
        const res = await fetch(this.uri, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ apiKey: process.env.NEXT_PUBLIC_DB_KEY, ...body }),
            next: { revalidate: this.revalidate }
        });

        return res;
    }

}

export { ServerData }