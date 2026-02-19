export interface ICategory {
  id: string,
  name: string,
  percent: number,
  minPercent: number,
  createdAt: string,
}

export interface IEditCategory {
  id: string,
  percent: number,
}
