# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :quiz
  has_many :options, dependent: :destroy
  has_many :attempt_answers, dependent: :destroy
  accepts_nested_attributes_for :options, allow_destroy: true
  validates :description, presence: true
  validates :options, length: { minimum: 2, maximum: 4 }
end
