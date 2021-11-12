# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :load_quiz, only: [:destroy, :show, :update]
  def index
    @quizzes = @current_user.quizzes.order("created_at Desc")
  end

  def create
    quiz = @current_user.quizzes.new(quiz_params)
    if quiz.save
      render status: :ok, json: { notice: "Quiz was successfully created" }
    else
      errors = quiz.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def update
    if @quiz.update(quiz_params)
      render status: :ok, json: { notice: "Successfully updated Quiz." }
    else
      render status: :unprocessable_entity,
        json: { error: @quiz.errors.full_messages.to_sentence }
    end
  end

  def show
    render
  end

  def destroy
    if @quiz.destroy
      render status: :ok, json: { notice: "Successfully deleted quiz." }
    else
      render status: :unprocessable_entity,
        json: { error: @quiz.errors.full_messages.to_sentence }
    end
  end

  private

    def load_quiz
      @quiz = @current_user.quizzes.find_by(id: params[:id])
      unless @quiz
        render status: :not_found, json: { error: "Quiz not found" }
      end
    end

    def quiz_params
      params.require(:quiz).permit(:title)
    end
end
