export class Item {
    public id! : number
    public created_at : string = ''
    public name : string = ''
    public category?: number |  null
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
  