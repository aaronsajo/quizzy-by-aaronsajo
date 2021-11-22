# frozen_string_literal: true

require "test_helper"

class QuestionTest < ActiveSupport::TestCase
  def setup
    user = User.new(
      email: "sam@example.com", first_name: "Sam", last_name: "Smith", password: "welcome",
      password_confirmation: "welcome", role: "administrator"
    )
    quiz = user.quizzes.new(title: "Sample Quiz")
    @question = quiz.questions.new(description: "What is h20?")
  end

  def test_question_should_be_valid_with_options
    option1 = @question.options.new(content: "Water", answer: true)
    option2 = @question.options.new(content: "Salt", answer: false)
    assert @question.valid?
  end

  def test_question_should_be_invalid_without_options
    assert @question.invalid?
    assert_includes @question.errors.full_messages, "Options is too short (minimum is 2 characters)"
  end

  def test_question_should_be_invalid_with_more_than_four_options
    option1 = @question.options.new(content: "Water", answer: true)
    option2 = @question.options.new(content: "Salt", answer: false)
    option3 = @question.options.new(content: "Honey", answer: false)
    option4 = @question.options.new(content: "sugar", answer: false)
    option5 = @question.options.new(content: "calcium", answer: false)
    assert @question.invalid?
    assert_includes @question.errors.full_messages, "Options is too long (maximum is 4 characters)"
  end

  def test_question_description_should_be_present
    @question.description = ""
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Description can't be blank"
  end

  def test_question_should_be_invalid_without_quiz
    @question.quiz = nil
    assert @question.invalid?
    assert_includes @question.errors.full_messages, "Quiz must exist"
  end
end
