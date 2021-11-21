# frozen_string_literal: true

require "test_helper"

class QuizzesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create!(
      email: "sam@example.com", first_name: "Sam", last_name: "Smith", password: "welcome",
      password_confirmation: "welcome", role: "administrator")
    @quiz = @user.quizzes.create!(title: "Sample")
    @user_header = headers(@user)
  end

  def test_should_list_all_quizzes_for_valid_user
    get quizzes_path, headers: @user_header
    assert_response :success
    response_body = response.parsed_body
    quiz_list = response_body["quizzes"]
    assert_equal quiz_list.length, @user.quizzes.length
  end

  def test_should_create_quiz_for_valid_user
    post quizzes_path, params: { quiz: { title: "Sample Quiz" } }, headers: @user_header
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_created", entity: "Quiz")
  end

  def test_should_not_create_without_title
    post quizzes_path, params: { quiz: { title: "" } }, headers: @user_header
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal response_json["error"], "Title can't be blank"
  end

  def test_should_update_quiz_title
    put quiz_path(@quiz.id), params: { quiz: { title: "Sample Quiz 2" } }, headers: @user_header
    assert_response :success
    @quiz.reload
    assert_equal @quiz.title, "Sample Quiz 2"
  end

  def test_should_not_update_quiz_without_title
    put quiz_path(@quiz.id), params: { quiz: { title: "" } }, headers: @user_header
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal response_json["error"], "Title can't be blank"
  end

  def test_should_destroy_quiz
    assert_difference "Quiz.count", -1 do
      delete quiz_path(@quiz.id), headers: @user_header
    end
    assert_response :ok
  end

  def test_should_show_quiz
    get quiz_path(@quiz.id), headers: @user_header
    assert_response :success
  end

  def test_should_not_show_Invalid_quiz
    get quiz_path(-10), headers: @user_header
    assert_response :not_found
    response_json = response.parsed_body
    assert_equal response_json["error"], t("not_found", entity: "Quiz")
  end
end
