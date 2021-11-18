# frozen_string_literal: true

class Quiz < ApplicationRecord
  belongs_to :user
  has_many :questions, dependent: :destroy
  has_many :attempts
  validates :title, presence: true, length: { maximum: 50 }
  validates :slug, uniqueness: true, allow_nil: true
end
