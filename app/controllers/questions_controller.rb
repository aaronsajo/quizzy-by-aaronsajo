# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :load_quiz
  def create
    @question = @quiz.questions.new(question_params)
    unless @question.save
      render status: :unprocessable_entity,
        json: { error: @question.errors.full_messages.to_sentence }
    end
  end

  private

    def question_params
      params.require(:question).permit(:description, :quiz_id, options_attributes: [ :content, :answer])
    end

    def load_quiz
      @quiz = @current_user.quizzes.find_by(id: question_params[:quiz_id])
      unless @quiz
        render status: :not_found, json: { error: "Quiz not found" }
      end
    end
end
