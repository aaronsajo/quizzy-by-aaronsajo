# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :quiz
  has_many :options, dependent: :destroy
  accepts_nested_attributes_for :options
  validates :description, presence: true
  validate :check_option_length

  private

    def check_option_length
      unless options.length <= 4 && options.length >= 2
        errors.add(:options, "Length should be less than 4 and more than 2")
      end
    end
end
