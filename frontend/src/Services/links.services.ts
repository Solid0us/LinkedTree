import http from "../http-common";

class LinksDataService {
  getLinksById<T>(userId: number) {
    return http.get<{ data: T }>(`/v1/links/users/${userId}`);
  }

  createLink(data: { [key: string]: any }) {
    return http.post(`/v1/links`, data);
  }
}

export default new LinksDataService();
