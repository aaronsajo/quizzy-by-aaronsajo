# frozen_string_literal: true

class CreateQuizzes < ActiveRecord::Migration[6.1]
  def change
    create_table :quizzes do |t|
      t.text :title
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
