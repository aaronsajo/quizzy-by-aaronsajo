# frozen_string_literal: true

class Quiz < ApplicationRecord
  belongs_to :user
  has_many :question, dependent: :destroy
  validates :title, presence: true, length: { maximum: 50 }
end
