export class Item {
    public id! : number
    created_at: string = ''
    public name : string = ''
    public category: number = 0
    public image: string = ''
  }

export class List {
  public id! : number
  public name : string = ''
}

export class ItemList {
  public id! : number
  public id_ref_list! : number
  public id_ref_item! : number
}

export interface ListItem {
  id: number;
  name: string;
}

export interface ShoppingList {
  id: number;
  name: string;
  items: ListItem[];
}