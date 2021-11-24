# frozen_string_literal: true

class AttemptsController < ApplicationController
  def show
    @answer_list = []
    @attempt = Attempt.find_by_id(params[:id])
    if @attempt
      quiz = Quiz.find_by_id(@attempt.quiz_id)
      quiz.questions.each do |question|
        correct_option = question.options.find_by(answer: true)
        @answer_list << correct_option
      end
    else
      render status: :unprocessable_entity,
        json: { error: t("not_found", entity: "Attempt") }
    end
  end
end
