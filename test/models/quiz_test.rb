# frozen_string_literal: true

require "test_helper"

class QuizTest < ActiveSupport::TestCase
  def setup
    user = User.new(
      email: "sam@example.com", first_name: "Sam", last_name: "Smith", password: "welcome",
      password_confirmation: "welcome", role: "administrator"
    )
    @quiz = user.quizzes.new(title: "Sample Quiz")
  end

  def test_quiz_should_be_valid
    assert @quiz.valid?
  end

  def test_title_should_be_of_valid_length
    @quiz.title = "a" * 100
    assert @quiz.invalid?
    assert_includes @quiz.errors.full_messages, "Title is too long (maximum is 50 characters)"
  end

  def test_for_valid_title
    @quiz.title = ""
    assert @quiz.invalid?
    assert_includes @quiz.errors.full_messages, "Title can't be blank"
  end

  def test_for_empty_space_title
    @quiz.title = "  "
    assert @quiz.invalid?
    assert_includes @quiz.errors.full_messages, "Title can't be blank"
  end

  def test_quiz_should_be_invalid_without_user
    @quiz.user = nil
    assert @quiz.invalid?
    assert_includes @quiz.errors.full_messages, "User must exist"
  end
end
