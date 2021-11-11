# frozen_string_literal: true

require "test_helper"

class OptionTest < ActiveSupport::TestCase
  def setup
    user = User.new(
      email: "sam@example.com", first_name: "Sam", last_name: "Smith", password: "welcome",
      password_confirmation: "welcome", role: "administrator"
    )
    quiz = user.quizzes.new(title: "Sample Quiz")
    question = quiz.questions.new(description: "What is h20?")
    @option1 = question.options.new(content: "Water", answer: true)
    @option2 = question.options.new(content: "Salt", answer: false)
  end

  def test_option_should_be_valid
    assert @option1.valid?
    assert @option2.valid?
  end

  def test_option_should_have_content
    @option1.content = ""
    @option2.content = ""
    assert @option1.invalid?
    assert @option2.invalid?
    assert_includes @option1.errors.full_messages, "Content can't be blank"
    assert_includes @option2.errors.full_messages, "Content can't be blank"
  end

  def test_option_should_be_invalid_without_question
    @option2.question = nil
    @option1.question = nil
    assert_not @option1.valid?
    assert_not @option2.valid?
    assert_includes @option1.errors.full_messages, "Question must exist"
    assert_includes @option2.errors.full_messages, "Question must exist"
  end
end
