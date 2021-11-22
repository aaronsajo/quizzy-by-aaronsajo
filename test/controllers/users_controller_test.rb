# frozen_string_literal: true

require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  def setup
    user = User.create!(
      email: "sam@example.com", first_name: "Sam", last_name: "Smith", password: "welcome",
      password_confirmation: "welcome", role: "administrator"
    )
    @quiz = user.quizzes.create!(title: "Sample Quiz")
    post users_path,
      params: { user: { first_name: "Eve", last_name: "Smith", email: "eve@example.com" }, quiz_id: @quiz.id }
    @participant = User.find_by(email: "eve@example.com")
  end

  def test_should_create_valid_participant
    assert_difference "User.count", 1 do
      post users_path,
        params: { user: { first_name: "James", last_name: "Smith", email: "James@example.com" }, quiz_id: @quiz.id }
    end
    assert_response :success
  end

  def test_should_not_create_without_firsr_last_name
    post users_path,
      params: { user: { first_name: "", last_name: "", email: "James@example.com" }, quiz_id: @quiz.id }

    assert_response :unprocessable_entity
    assert_includes response.parsed_body["error"], "First name can't be blank", "Last name can't be blank"
  end

  def test_should_not_create_invalid_email
    post users_path,
      params: { user: { first_name: "James", last_name: "Smith", email: "James" }, quiz_id: @quiz.id }

    assert_response :unprocessable_entity
    assert_includes response.parsed_body["error"], "Email is invalid"
  end

  def test_should_not_create_without_email
    post users_path,
      params: { user: { first_name: "James", last_name: "Smith", email: "" }, quiz_id: @quiz.id }

    assert_response :unprocessable_entity
    assert_includes response.parsed_body["error"], "Email can't be blank and Email is invalid"
  end
end
