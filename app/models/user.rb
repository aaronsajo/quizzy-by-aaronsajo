# frozen_string_literal: true

class User < ApplicationRecord
  enum role: { standard: 0, administrator: 1 }
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze

  validates :first_name, presence: true, length: { maximum: Constants::MAX_NAME_LENGTH }
  validates :last_name, presence: true, length: { maximum: Constants::MAX_NAME_LENGTH }
  validates :email, presence: true, uniqueness: true, format: { with: VALID_EMAIL_REGEX }

  before_save :to_lowercase

  private

    def to_lowercase
      email.downcase!
    end
end
