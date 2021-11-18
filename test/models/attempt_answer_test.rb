# frozen_string_literal: true

require "test_helper"

class AttemptAnswerTest < ActiveSupport::TestCase
  def setup
    admin_user = User.create(
      first_name: "Sam",
      last_name: "Smith",
      email: "sam@example.com",
      password: "welcome",
      password_confirmation: "welcome",
      role: "administrator"
    )
    quiz = admin_user.quizzes.create(title: "Sample Quiz")
    question = quiz.questions.create(
      description: "Question",
      options_attributes: [{ content: "A", answer: true }, { content: "B", answer: false }])
    option1 = question.options.first
    option2 = question.options.last
    standard_user = User.create(
      first_name: "Sam",
      last_name: "Smith",
      email: "sam@example.com",
      password: "welcome",
      password_confirmation: "welcome"
    )
    attempt = standard_user.attempts.new(quiz_id: quiz.id)
    @attempt_answer = attempt.attempt_answers.new(attempted_answer: option1.id, question_id: question.id)
  end

  def test_attempt_answer_is_valid
    assert @attempt_answer.valid?
  end

  def test_attempt_answer_should__be_invalid_without_question
    @attempt_answer.question = nil
    assert @attempt_answer.invalid?
    assert_includes @attempt_answer.errors.full_messages, "Question must exist"
  end

  def test_attempt_answer_should_be_invalid_without_attempt
    @attempt_answer.attempt = nil
    assert @attempt_answer.invalid?
    assert_includes @attempt_answer.errors.full_messages, "Attempt must exist"
  end

  def test_attempt_answer_should_be_invalid_without_attempted_answer
    @attempt_answer.attempted_answer = nil
    assert @attempt_answer.invalid?
    assert_includes @attempt_answer.errors.full_messages, "Attempted answer can't be blank"
  end
end
