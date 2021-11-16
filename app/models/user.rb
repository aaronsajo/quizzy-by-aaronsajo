# frozen_string_literal: true

class User < ApplicationRecord
  enum role: { standard: 0, administrator: 1 }
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze
  has_secure_password
  has_secure_token :authentication_token
  has_many :quizzes, dependent: :destroy
  has_many :attempts

  validates :first_name, presence: true, length: { maximum: Constants::MAX_NAME_LENGTH }
  validates :last_name, presence: true, length: { maximum: Constants::MAX_NAME_LENGTH }
  validates :email, presence: true, uniqueness: true, format: { with: VALID_EMAIL_REGEX }
  validates :password, length: { minimum: 6 }, if: -> { password.present? }
  validates :password_confirmation, presence: true, on: :create
  before_save :to_lowercase

  private

    def to_lowercase
      email.downcase!
    end
end
