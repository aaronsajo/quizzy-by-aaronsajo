# frozen_string_literal: true

require "test_helper"

class QuestionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create!(
      email: "sam@example.com", first_name: "Sam", last_name: "Smith", password: "welcome",
      password_confirmation: "welcome", role: "administrator")
    @quiz = @user.quizzes.create!(title: "Sample")
    @question = @quiz.questions.create!(
      description: "Question",
      options_attributes: [{ content: "Option1", answer: false }, { content: "option2", answer: true }])
    @option1 = @question.options.first
    @user_header = headers(@user)
  end

  def test_should_list_all_questions
    get questions_path, params: { id: @quiz.id }
    assert_response :success
    response_body = response.parsed_body
    assert_equal response_body["questions"].length, @quiz.questions.length
  end

  def test_should_create_question_and_option
    post questions_path, params: {
      question: {
        description: "Question 2",
        quiz_id: @quiz.id,
        options_attributes: [{ content: "Opt1", answer: false },
      { content: "opt2", answer: true }]
      }
    }, headers: @user_header
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_created", entity: "Question")
  end

  def test_should_not_create_without_description
    post questions_path, params: {
      question: {
        description: "",
        quiz_id: @quiz.id,
        options_attributes: [{ content: "Opt1", answer: false },
          { content: "opt2", answer: true }]
      }
    }, headers: @user_header
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal response_json["error"], "Description can't be blank"
  end

  def test_should_not_create_without_option_content
    post questions_path, params: {
      question: {
        description: "Q1",
        quiz_id: @quiz.id,
        options_attributes: [{ content: "", answer: false },
          { content: "opt2", answer: true }]
      }
    }, headers: @user_header
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal response_json["error"], "Options content can't be blank"
  end

  def test_should_not_create_with_invalid_no_of_options
    post questions_path, params: {
      question: {
        description: "Q1",
        quiz_id: @quiz.id,
        options_attributes: [{ content: "Opt1", answer: false }]
      }
    }, headers: @user_header
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal response_json["error"], "Options Length should be less than 5 and more than 1"
  end

  def test_should_update_question_description
    put question_path(@question.id), params: {
      question: {
        description: "Q1",
        quiz_id: @quiz.id
      }
    }, headers: @user_header
    assert_response :success
    @question.reload
    assert_equal @question.description, "Q1"
  end

  def test_should_update_question_description
    put question_path(@question.id), params: {
      question: {
        description: "Q1",
        quiz_id: @quiz.id
      }
    }, headers: @user_header
    assert_response :success
    @question.reload
    assert_equal @question.description, "Q1"
  end

  def test_should_update_question_description
    put question_path(@question.id), params: {
      question: {
        description: "",
        quiz_id: @quiz.id
      }
    }, headers: @user_header
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal response_json["error"], "Description can't be blank"
  end

  def test_should_update_question_with_options
    assert_difference "Option.count", 2 do
      put question_path(@question.id), params: {
        question: {
          description: "Q1",
          quiz_id: @quiz.id,
          options_attributes: [{ content: "Option3", answer: false }, { content: "option4", answer: false }]
        }
      }, headers: @user_header
    end
    assert_response :ok
  end

  def test_should_update_question_with_options_delete
    put question_path(@question.id), params: {
      question: {
        description: "Q1",
        quiz_id: @quiz.id,
        options_attributes: [{ id: @option1.id, content: "Option3", answer: false }]
      }
    }, headers: @user_header
    @option1.reload
    assert_equal @option1.content, "Option3"
  end

  def test_should_destroy_question
    assert_difference "Question.count", -1 do
      delete question_path(@question.id), headers: @user_header
    end
    assert_response :ok
  end
end
