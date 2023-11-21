import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Item } from '../data/shopping-list';
import { environment } from "src/environments/environment";

export const ITEM_TABLE = 'items'
export const CATEGORY_TABLE = 'category'

@Injectable({
  providedIn: 'root'
})

export class ShoppingListService {

  private supabase: SupabaseClient

  constructor (private loadingCtrl: LoadingController) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  createLoader() {
    return this.loadingCtrl.create()
  }

  async getItems () {
    const { data, error } = await this.supabase
      .from(ITEM_TABLE)
      .select('*')
      .order('name')

    return data || []
  }

  async getCategories () {
    const { data, error } = await this.supabase
      .from(CATEGORY_TABLE)
      .select('*')
      .order('name')

    return data || []
  }

  async getItem (id: number) {
    const { data, error } = await this.supabase
      .from(ITEM_TABLE)
      .select('*')
      .eq('id', id)
      .single()

    return data || {}
  }



  async getCategory(id: number) {
    const { data, error } = await this.supabase
      .from(CATEGORY_TABLE)
      .select('*')
      .eq('id', id)
      .single()

    return data || {}
  }


  async updateItem (item: Item) {
    const {data, error} = await this.supabase
      .from(ITEM_TABLE)
      .update(item)
      .eq('id', item.id)
      .select()

    return data
  }

  async createItem(item : Item) {

    const {data, error} = await this.supabase
      .from(ITEM_TABLE)
      .insert({
        name: item.name,
        category: item.category,
      })
      .select('*')
      .single();

    return data
  }

  async deleteItem (item: Item) {
    const {data, error} = await this.supabase
      .from(ITEM_TABLE)
      .delete()
      .eq('id', item.id)
      .select()

    return data
  }

}