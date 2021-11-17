# frozen_string_literal: true

class AttemptsController < ApplicationController
  def show
    @correct_answer_count = 0
    @incorrect_answer_count = 0
    @answer_list = []
    @attempt = Attempt.find_by_id(params[:id])
    @attempt.attempt_answers.each do |attempt_answer_data|
      option = Option.find_by_id(attempt_answer_data[:attempted_answer])
      if option.answer
        @correct_answer_count += 1
      else
        @incorrect_answer_count += 1
      end
      question = Question.find_by_id(attempt_answer_data[:question_id])
      correct_option = question.options.find_by(answer: true)
      @answer_list << correct_option
    end
  end
end
