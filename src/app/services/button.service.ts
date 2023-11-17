import { Injectable } from "@angular/core";

import { LoadingController } from "@ionic/angular";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { SoundButton } from "src/app/data/sound-button";
import { environment } from "src/environments/environment";

export const BUTTON_TABLE = 'button'
export const CATEGORY_TABLE = 'category'

@Injectable({
  providedIn: 'root'
})

export class SoundButtonService {

  private supabase: SupabaseClient

  constructor (private loadingCtrl: LoadingController) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  createLoader() {
    return this.loadingCtrl.create()
  }

  async getButtons () {
    const { data, error } = await this.supabase
      .from(BUTTON_TABLE)
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

  async getButton (id: number) {
    const { data, error } = await this.supabase
      .from(BUTTON_TABLE)
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


  async updateButton (button: SoundButton) {
    const {data, error} = await this.supabase
      .from(BUTTON_TABLE)
      .update(button)
      .eq('id', button.id)
      .select()

    return data
  }

  async createButton(button : SoundButton) {

    const {data, error} = await this.supabase
      .from(BUTTON_TABLE)
      .insert({
        name: button.name,
        category: button.category,
        position: button.position
      })
      .select('*')
      .single();

    return data
  }

  async deleteButton (button: SoundButton) {
    const {data, error} = await this.supabase
      .from(BUTTON_TABLE)
      .delete()
      .eq('id', button.id)
      .select()

    return data
  }

}
