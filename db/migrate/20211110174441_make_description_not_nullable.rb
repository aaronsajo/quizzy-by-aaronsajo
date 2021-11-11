# frozen_string_literal: true

class MakeDescriptionNotNullable < ActiveRecord::Migration[6.1]
  def change
    change_column_null :questions, :description, false
  end
end
