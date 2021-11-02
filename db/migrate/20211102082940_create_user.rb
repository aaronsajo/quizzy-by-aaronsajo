# frozen_string_literal: true

class CreateUser < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.text :email, null: false
      t.text :first_name, null: false
      t.text :last_name, null: false
      t.timestamps
    end
  end
end
