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
    end
    if @attempt.update(submitted: true)
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
