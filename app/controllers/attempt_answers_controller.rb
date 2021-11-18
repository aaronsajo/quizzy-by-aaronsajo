# frozen_string_literal: true

class AttemptAnswersController < ApplicationController
  before_action :load_attempt
  def create
    @correct_answer_count = 0
    @incorrect_answer_count = 0
    answer_params[:attempts].each do |attempt_data|
      @attempt_answer = @attempt.attempt_answers.new(attempt_data)
      unless @attempt_answer.save!
        render status: :unprocessable_entity, json: { error: @attempt_answer.errors.full_messages.to_sentence }
      end
      option = Option.find_by_id(attempt_data[:attempted_answer])
      if option.answer
        @correct_answer_count += 1
      end
    end
    quiz = Quiz.find_by_id(@attempt.quiz_id)
    @incorrect_answer_count = quiz.questions.size - @correct_answer_count

    if @attempt.update(
      submitted: true, correct_answer_count: @correct_answer_count,
      incorrect_answer_count: @incorrect_answer_count)
      render status: :ok, json: { notice: t("successfully_submited") }
    else
      render status: :unprocessable_entity, json: { error: @attempt.errors.full_messages.to_sentence }
    end
  end

  private

    def load_attempt
      @attempt = Attempt.find_by_id(answer_params[:attempt_id])
    end

    def answer_params
      params.require(:answer).permit(:attempt_id, attempts: [:question_id, :attempted_answer])
    end
end
