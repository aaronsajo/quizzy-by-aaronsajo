# frozen_string_literal: true

require "test_helper"

class QuizTest < ActiveSupport::TestCase
  def setup
    @quiz = Quiz.new(title: "Sample Quiz", user_id: 1)

    @user = User.new(
      email: "sam@example.com", first_name: "Sam", last_name: "Smith", password: "welcome",
      password_confirmation: "welcome"
    )
  end

  def test_quiz_should_be_valid
    @user.save!
    assert @quiz.valid?
  end

  def test_user_should_not_be_valid_without_user
    assert_not @quiz.valid?
    assert_equal @quiz.errors.full_messages, ["User must exist"]
  end

  def test_title_should_be_of_valid_length
    @user.save!
    @quiz.title = "a" * 100
    assert @quiz.invalid?
  end

  def test_for_valid_title
    @user.save!
    @quiz.title = ""
    assert @quiz.invalid?
  end

  def test_for_empty_space_title
    @quiz.title = "  "
    assert_not @quiz.save
  end
end
