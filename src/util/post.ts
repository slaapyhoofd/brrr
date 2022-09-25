export default class ProxyHandler {
  private readonly baseUrl: string;
  private readonly proxyUrl: string;

  constructor(baseUrl: string, proxyUrl: string) {
    this.baseUrl = baseUrl;
    this.proxyUrl = proxyUrl;
  }

  public async post(path: string, data: any, xApiKey?: string) {
    try {
      const body = { data, url: this.baseUrl + path, xApiKey };
      return await fetch(this.proxyUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(body),
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }

  public getBase = () => this.baseUrl;
}