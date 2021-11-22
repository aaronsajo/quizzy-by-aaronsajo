# frozen_string_literal: true

require "test_helper"

class AttemptAnswersControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create!(
      email: "sam@example.com", first_name: "Sam", last_name: "Smith", password: "welcome",
      password_confirmation: "welcome", role: "administrator")
    @quiz = @user.quizzes.create!(title: "Sample")
    @question = @quiz.questions.create!(
      description: "Question",
      options_attributes: [{ content: "Option1", answer: false }, { content: "option2", answer: true }])
    @option1 = @question.options.first
    @participant = User.create!(
      {
        email: "eve@example.com",
        first_name: "Eve", last_name: "Smith", password: "welcome",
        password_confirmation: "welcome"
      })
    @attempt = @participant.attempts.create(quiz_id: @quiz.id)
  end

  def test_should_create_attempt_answer_for_attempt
    post attempt_answers_path,
      params: {
        answer: {
          attempt_id: @attempt.id,
          attempts: [{ question_id: @question.id, attempted_answer: @option1.id }]
        }
      }
    assert_response :success
    response_body = response.parsed_body
    assert_equal response_body["notice"], "Quiz was successfully submited!"
  end
end
