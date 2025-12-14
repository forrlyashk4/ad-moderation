import { makeAutoObservable } from "mobx";

class PaginationStore {
  currentPage = 1;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  changePage(nextPage: number) {
    this.currentPage = nextPage;
  }
}

export const paginationStore = new PaginationStore();
