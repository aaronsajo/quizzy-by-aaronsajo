# frozen_string_literal: true

class Attempt < ApplicationRecord
  belongs_to :quiz
  belongs_to :user
  has_many :attempt_answers
end
