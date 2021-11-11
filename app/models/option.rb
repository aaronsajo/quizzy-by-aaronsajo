# frozen_string_literal: true

class Option < ApplicationRecord
  belongs_to :question
  validates :content, presence: true, length: { maximum: 50 }
end
