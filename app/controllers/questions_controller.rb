# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, except: :index
  before_action :load_quiz, only: [:create]
  before_action :load_question, only: [:destroy, :show, :update]

  def index
    @quiz = Quiz.find_by(id: params[:id])
  end

  def create
    @question = @quiz.questions.new(question_params)
    if @question.save
      render status: :ok, json: { notice: t("successfully_created", entity: "Question") }
    else
      render status: :unprocessable_entity,
        json: { error: @question.errors.full_messages.to_sentence }
    end
  end

  def show
    render
  end

  def update
    if @question.update(update_question_params)
      render status: :ok, json: { notice: t("successfully_updated", entity: "Question") }
    else
      render status: :unprocessable_entity, json: { error: @question.errors.full_messages.to_sentence }
    end
  end

  def destroy
    if @question.destroy
      render status: :ok, json: { notice: t("successfully_deleted", entity: "Question") }
    else
      render status: :unprocessable_entity,
        json: { error: @question.errors.full_messages.to_sentence }
    end
  end

  private

    def load_quiz
      @quiz = @current_user.quizzes.find_by(id: question_params[:quiz_id])
      unless @quiz
        render status: :not_found, json: { error: t("not_found", entity: "Quiz") }
      end
    end

    def question_params
      params.require(:question).permit(:description, :quiz_id, options_attributes: [ :content, :answer])
    end

    def load_question
      @question = Question.find_by(id: params[:id])
      unless @question
        render status: :not_found, json: { error: t("not_found", entity: "Question") }
      end
    end

    def update_question_params
      params.require(:question).permit(:description, :quiz_id, options_attributes: [ :content, :answer, :id, :_destroy])
    end
end
