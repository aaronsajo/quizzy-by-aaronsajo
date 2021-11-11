# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :quiz
  has_many :options, dependent: :destroy
  accepts_nested_attributes_for :options
  validates :description, presence: true
end
