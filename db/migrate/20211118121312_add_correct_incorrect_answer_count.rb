# frozen_string_literal: true

class AddCorrectIncorrectAnswerCount < ActiveRecord::Migration[6.1]
  def change
    add_column :attempts, :correct_answer_count, :integer, default: 0
    add_column :attempts, :incorrect_answer_count, :integer, default: 0
  end
end
