# frozen_string_literal: true

class AttemptAnswersController < ApplicationController
  before_action :load_attempt
  def create
    answer_params[:attempts].each do |attempt_data|
      attempt_answer = @attempt.attempt_answers.new(attempt_data)
      attempt_answer.save!
      option = Option.find_by_id(attempt_data[:attempted_answer])
    end
    @attempt.update(submitted: true)
  end

  private

    def load_attempt
      @attempt = Attempt.find_by_id(answer_params[:attempt_id])
    end

    def answer_params
      params.require(:answer).permit(:attempt_id, attempts: [:question_id, :attempted_answer])
    end
end
